import { InjectionToken, Provider } from "@angular/core";

export type TaskStatusOptions = {
  value: string,
  text: string,
  taskStatus: TaskStatus
};

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

export const TaskStatusOptions: TaskStatusOptions [] = [
    {
      value: 'open',
      taskStatus: 'OPEN',
      text: 'Open'
    },
    {
      value: 'in-progress',
      taskStatus: 'IN_PROGRESS',
      text: 'In Progress'
    },
    {
      value: 'done',
      taskStatus: 'DONE',
      text: 'Done'
    }
  ];

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}


export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions[]>('task-status-token');
export const taskStatusOptionsProvider: Provider = {provide: TASK_STATUS_OPTIONS, useValue: TaskStatusOptions};