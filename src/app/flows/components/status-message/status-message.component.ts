import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'status-message',
  templateUrl: 'status-message.component.html',
  styleUrls: ['status-message.component.css'],
})
export class StatusMessageComponent {
  @Input() message: string;
  @Input() type: string;
  @Input() show: boolean;
  @Output() onClose = new EventEmitter();
}
