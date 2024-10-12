import { Component, EventEmitter, Input, Output, computed, input, output } from '@angular/core';
import { User } from './user.model';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  // @Input({required:true}) avatar! : string;
  // @Input({required: true}) name! : string;
  // @Input({required: true}) id! : string;

  @Output() selectedUserEvent = new EventEmitter<string>();
  selectedUser = output<string>();

  // avatar = input.required<string>();
  // name = input.required<string>();

  // imagePath = computed(() => '../../assets/users/' + this.avatar());

  // selectedUser = signal(DUMMY_USERS[randomIndex]);
  // imagePath = computed(() => '../../assets/users/' + this.selectedUser().avatar);

  get imagePath() {
    return '../../assets/users/' + this.user.avatar;
  }

  onSelectedUser() {
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // this.selectedUser.set(DUMMY_USERS[randomIndex]);
    // this.selectedUser = DUMMY_USERS[randomIndex];

    this.selectedUserEvent.emit(this.user.id);
    this.selectedUser.emit(this.user.id);
  }
}
