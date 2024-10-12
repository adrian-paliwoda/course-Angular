import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { Place } from "./place.model";
import { ErrorService } from "../shared/error.service";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Error occured. Cannot get available places')
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Error occured. Cannot get user places')
      .pipe(tap({
        next: (places) => this.userPlaces.set(places)
      })
      );
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some(p => p.id === place.id)) {
      return;
    }

    this.userPlaces.set([...prevPlaces, place]);
    return this.putPlace('http://localhost:3000/user-places', 'Error occured. Cannot add place to user favorite', place)
      .pipe(catchError(error => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to store selected place');
        return throwError(() => new Error('Failed to store selected place'))
      }));
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    return this.httpClient
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to remove the selected place.');
          return throwError(
            () => new Error('Failed to remove the selected place.')
          );
        })
      );
  }

  private fetchPlaces(
    url: string = 'http://localhost:3000/user-places',
    errorMessage: string = 'Error occured. Cannot get users places') {

    return this.httpClient.get<{ places: Place[] }>(url)
      .pipe(
        map((value) => value.places),
        catchError((error) => throwError(() => {
          console.log(error);
          return new Error(errorMessage)
        }))
      );
  }

  private putPlace(
    url: string = 'http://localhost:3000/user-places', errorMessage: string = 'Error occured. Cannot get users places', place: Place) {

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
      });
  }
}