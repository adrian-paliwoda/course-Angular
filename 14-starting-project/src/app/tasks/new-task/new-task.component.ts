import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private router = inject(Router);

  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;

  private tasksService = inject(TasksService);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );

    this.submitted = true;

    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.submitted){
    return true;
  }
  
  if (component.enteredTitle() || component.enteredDate() || component.enteredSummary()) {
    const confirm = window.confirm('Do you really wan to leave? You will lose the entered data.');
    return confirm;
  }

  return true;
}