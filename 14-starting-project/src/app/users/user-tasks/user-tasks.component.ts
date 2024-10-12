import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
// export class UserTasksComponent implements OnInit {
export class UserTasksComponent {
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);

  // userName = '';
  userId = input.required<string>();
  message = input.required<string>();
  userName = input.required<string>();
  // userName = computed(() => this.usersService.users.find((u) => u.id === this.userId())?.name)

  // ngOnInit(): void {
  //   console.log(this.message());
  //   // this.activatedRoute.paramMap.subscribe({
  //   //   // next: paraMap => this.userName() = this.usersService.users.find(u => u.id === paraMap.get('userId'))?.name
  //   // })
  // }
}

export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  const userName = usersService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))?.name || '';

  return userName;
}

export const resolveTitle: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
}