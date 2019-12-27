import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import * as moment from "moment";
import { TaskService } from "./services/task.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  taskForm: FormGroup;
  minDate: any = "";
  tasks: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      taskDate: [moment().format("YYYY-MM-DD"), Validators.required],
      description: ["", [Validators.maxLength(250)]]
    });

    this.minDate = moment().format("YYYY-MM-DD");

    this.taskService
      .getTasksIndexed()
      .then(tasks => {
        this.tasks = tasks;
      })
      .catch(err => {
        console.log(err);
      });
  }

  get formControl() {
    return this.taskForm.controls;
  }

  submitForm() {
    if (this.taskForm.value.title.trim() == "") {
      this.taskForm.controls["title"].setErrors({ required: true });
      this.taskForm.patchValue({ title: "" });
      return;
    }
    this.taskService
      .createTaskIndexed(this.taskForm.value)
      .then(res => {
        this.tasks = res;
        this.taskForm.reset();
        this.taskForm.patchValue({
          taskDate: moment().format("YYYY-MM-DD")
        });
      })
      .catch(err => console.log(err));
  }

  deleteTask(i) {
    this.taskService
      .deleteTaskIndexed(this.tasks[i].id)
      .then(res => {
        this.tasks = res;
      })
      .catch(err => console.log(err));
  }
}
