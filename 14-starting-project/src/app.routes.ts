import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { TasksComponent } from "./app/tasks/tasks.component";
import { NoTaskComponent } from "./app/tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./app/users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./app/not-found/not-found.component";
import { usersRoute } from "./app/users/users.routes";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segmants) => {
  const router = inject(Router);
  const shouldGetAccess = Math.random();

  if (shouldGetAccess < 0.5) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path: '', // <your-domain>/
    component: NoTaskComponent,
    // redirectTo: '/users/u1',
    // pathMatch: 'full'
  },
  {
    title: resolveTitle,
    path: 'users/:userId', // <your-domain>/users/<uid>
    component: UserTasksComponent,
    children: usersRoute,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello'
    },
    resolve: {
      userName: resolveUserName
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]