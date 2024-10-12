import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private route: Router) {}

  onLogout() {
    this.isAuthenticated = false;
    this.authService.logout();
    this.route.navigate(['/auth'])
  }

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
