import { Injectable } from "@angular/core";
import { DUMMY_TASKS } from "../dummy-tasks";
import { Task } from "./task.model";

@Injectable({
    providedIn: "root"
})
export class TasksService {
    private tasks = DUMMY_TASKS;

    constructor() {
        const tasks = localStorage.getItem('tasks');
        if (tasks){
            this.tasks = JSON.parse(tasks);
        }
    }

    getSelectedUserTasks(userId: string) {
        return this.tasks.filter((task) => task.userId === userId) ?? { id: '', userId: '', title: '', summary: '', dueDate: '' };
    }

    addTask(task: Task, userId: string){
        task.userId = userId ?? "u0"
        this.tasks.push(task);
        this.saveTasks();
    }

    removeTask(taskId: string) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}