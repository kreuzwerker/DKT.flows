import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TasksAppService } from './../../services';

@Component({
  selector: 'task-comments',
  templateUrl: 'task-comments.component.html',
  styleUrls: ['task-comments.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskCommentsComponent {
  constructor(
    public tasksApp: TasksAppService,
  ) {}

  submitForm(form: NgForm) {
    if (form.valid) {
      this.tasksApp.addTaskComment(form.value.comment);
      form.resetForm();
    }
  }
}
