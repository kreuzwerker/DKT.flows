import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Task } from '../../models';
import { StepTestResultType } from '../../../flows/models';

@Component({
  selector: 'dkt-task-text-widget',
  templateUrl: 'task-text-widget.component.html',
  styleUrls: ['task-text-widget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskTextWidgetComponent {
  @Input() taskItem: any;
}
