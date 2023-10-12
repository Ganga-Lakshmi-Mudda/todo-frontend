import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  task: any = {};
  tasks: any[] = [];
  editing: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  onSubmit() {
    if (this.editing) {
      this.taskService
        .editTask(this.task, this.task.id)
        .subscribe((response) => {
          console.log('Task Updated:', response);
          this.resetForm();
          this.fetchTasks();
        });
    } else {
      this.taskService.createTask(this.task).subscribe((response) => {
        console.log('Task created:', response);
        this.resetForm();
        this.fetchTasks();
      });
    }
    this.editing = false;
    this.tasks = this.tasks;
  }

  fetchTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.fetchTasks();
    });
  }
  editTask(task: any, taskId: number) {
    this.editing = true;
    this.task = { ...task };
  }
  resetForm() {
    this.task = {
      title: '',
      description: '',
      completed: false,
    };
  }
}
