import { Component, Input } from '@angular/core';

@Component({
  selector: 'dkt-task-item',
  templateUrl: 'task-item.component.html',
  styleUrls: ['task-item.component.css']
})
export class TaskItemComponent {
  @Input() state: String;
}
