import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TaskComment } from '../../models';

@Component({
  selector: 'dkt-task-comment-item',
  templateUrl: 'task-comment-item.component.html',
  styleUrls: ['task-comment-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCommentItemComponent {
  @Input() comment: TaskComment;
}
