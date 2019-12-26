import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import { TaskService } from './services/task.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  taskForm: FormGroup;
  minDate: any = '';
  tasks: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      taskDate: [moment().format('YYYY-MM-DD'), Validators.required],
      description: ['', [Validators.maxLength(250)]]
    });

    this.minDate = moment().format('YYYY-MM-DD');

    this.taskService.getTasks().subscribe(
      (res: any) => {
        //console.log(res);
        this.tasks = res.data;
      },
      err => {}
    );
  }

  get formControl() {
    return this.taskForm.controls;
  }

  submitForm() {
    //console.log(this.taskForm.value);
    if (this.taskForm.value.title.trim() == '') {
      this.taskForm.controls['title'].setErrors({ required: true });
      this.taskForm.patchValue({ title: '' });
      return;
    }
    this.taskService.createTask(this.taskForm.value).subscribe(
      (res: any) => {
        //console.log(res);
        this.tasks = res.data;
        this.taskForm.reset();
        this.taskForm.patchValue({
          taskDate: moment().format('YYYY-MM-DD')
        });
      },
      err => {}
    );
  }

  deleteTask(i) {
    this.taskService.deleteTask(this.tasks[i]._id).subscribe(
      (res: any) => {
        //console.log(res);
        this.tasks = res.data;
      },
      err => {
        console.log(err);
      }
    );
  }

  // trunc(a) {
  //   return a.slice(0, 251) + "...";
  // }
}
