import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Task } from '../../Task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgFor, TaskItemComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks)=> this.tasks = tasks);
  }

  deleteTask(task: Task) {
    console.log(task);

    this.taskService
      .deleteTask(task)
      .subscribe(
        ()=> this.tasks = this.tasks.filter((t) => t.id !== task.id)
      );
  }
}
