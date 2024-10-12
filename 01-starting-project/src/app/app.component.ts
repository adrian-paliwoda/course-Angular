import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId : string = 'u1';

  get selectedUser() {
    return this.users.find(u => u.id === this.selectedUserId) ?? {name:'', avatar: '', id: '' };
  }

  onSelectedUser(event: string) {
    const selectedUser = this.users.find(u => u.id === event);
    if (selectedUser) {
      this.selectedUserId = selectedUser.id;
    } else {
      console.log("Use not found!");
    }
  }

  onSelectedUserSignal(event: string) {
    console.log("Received signal!");
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.selectedUserId = DUMMY_USERS[0].id
  }
}
