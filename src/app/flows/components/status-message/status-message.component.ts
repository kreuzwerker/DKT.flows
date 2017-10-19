import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dkt-status-message',
  templateUrl: 'status-message.component.html',
  styleUrls: ['status-message.component.css'],
})
export class StatusMessageComponent implements OnChanges {
  @Input() message: string;
  @Input() type: string;
  @Input() show: boolean;
  @Output() onClose = new EventEmitter();

  timeout: any = null;

  ngOnChanges(changes: SimpleChanges) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    // Automatically close success messages after 5s
    if (this.type === 'success') {
      this.timeout = setTimeout(() => {
        this.onClose.emit();
      }, 5000);
    }
  }
}
