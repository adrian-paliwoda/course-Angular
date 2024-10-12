import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { Task } from '../task.model';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({required: true}) userId!: string;
  // @Output() newTask = new EventEmitter<Task>();
  // @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private tasksService = inject(TasksService);


  enteredTitle = '';
  enteredDueDate = '';
  enteredSummary = '';
  
  // enteredTitle = signal('');
  // enteredDueDate = signal('');
  // enteredSummary = signal('');

  onCreate() {

    if (this.enteredDueDate === ''
      || this.enteredSummary === ''
      || this.enteredTitle === ''
    )
    {
      return;
    }

    const task = {
      dueDate: this.enteredDueDate,
      id: 'u' + Math.random(),
      summary: this.enteredSummary,
      title: this.enteredTitle,
      userId: ''
    };
    this.tasksService.addTask(task, this.userId)
  
    this.close.emit();
  }

  onCancel(){
    this.close.emit();
  }

}
