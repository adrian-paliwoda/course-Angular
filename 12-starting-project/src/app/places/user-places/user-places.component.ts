import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl:   './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{
  private placeService = inject(PlacesService);
  private destroyRef = inject(DestroyRef);

  places = this.placeService.loadedUserPlaces;
  isFetching = signal(false);
  error = signal('');
   

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placeService.loadUserPlaces()
      .subscribe({
        complete: () => {
          this.isFetching.set(false);
        },
        error: (errorValue) => {
          console.log(errorValue.message);

          this.error.set(errorValue.message);
        }
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }

  onRemovePlace(place: Place){
    const subscription = this.placeService.removeUserPlace(place).subscribe();

  this.destroyRef.onDestroy(() => {
    subscription.unsubscribe();
  });;
  }
}
