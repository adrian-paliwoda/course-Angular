import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, TaskStatusOptions, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider]
})
export class TasksListComponent {
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  private taskService: TasksService = inject(TasksServiceToken);
  private selectedFilter = signal<string>('all');

  tasks = computed(() => {
    const filter = this.selectedFilter().toLowerCase();
    switch (filter) {
      case 'all':
        return this.taskService.allTasks();
      case 'open':
        return this.taskService.allTasks().filter(task => task.status === 'OPEN');
      case 'in-progress':
      case 'in_progress':
        return this.taskService.allTasks().filter(task => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService.allTasks().filter(task => task.status === 'DONE');
      default:
        return this.taskService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
