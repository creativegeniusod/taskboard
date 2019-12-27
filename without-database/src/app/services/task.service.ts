import { Injectable } from "@angular/core";

import * as moment from "moment";
import { BaseService } from "./base.service";

@Injectable({ providedIn: "root" })
export class TaskService extends BaseService {
  constructor() {
    super();
  }

  getTasksIndexed() {
    return this.connection.select({
      from: "tasks",
      order: {
        by: "task_date",
        type: "asc"
      }
    });
  }
  createTaskIndexed(body) {
    const task = {
      task_name: body.title.trim(),
      task_date: moment(body.taskDate).toDate(),
      description: body.description.trim()
    };

    this.connection.insert({
      into: "tasks",
      values: [task]
    });

    return this.getTasksIndexed();
  }

  deleteTaskIndexed(taskId: number) {
    this.connection.remove({
      from: "tasks",
      where: {
        id: taskId
      }
    });
    return this.getTasksIndexed();
  }
}
