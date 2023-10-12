import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiURL = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: any) {
    return this.http.post(this.apiURL, task);
  }

  getAllTasks() {
    return this.http.get<any[]>(this.apiURL);
  }

  deleteTask(id: number) {
    return this.http.delete<any[]>(`${this.apiURL}/${id}`);
  }
  editTask(task: any, id: number) {
    return this.http.put(`${this.apiURL}/${id}`, task);
  }
}
