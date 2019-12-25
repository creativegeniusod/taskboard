import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

const taskUrl: string = environment.production
  ? "http://112.196.24.34:8014/task"
  : "http://112.196.24.34:8014/task";

@Injectable({ providedIn: "root" })
export class TaskService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private httpClient: HttpClient) {}

  getTasks() {
    return this.httpClient.get(taskUrl, this.httpOptions);
  }

  createTask(body) {
    return this.httpClient.post(taskUrl, body, this.httpOptions);
  }

  getTask(id) {}

  updateTask(id) {}

  deleteTask(id) {
    return this.httpClient.delete(taskUrl + `/${id}`, this.httpOptions);
  }
}
