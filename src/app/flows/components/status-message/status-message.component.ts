import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'status-message',
  templateUrl: 'status-message.component.html',
  styleUrls: ['status-message.component.css'],
})
export class StatusMessageComponent implements OnChanges {
  @Input() message: string;
  @Input() type: string;
  @Input() show: boolean;
  @Output() onClose = new EventEmitter();

  // // NgChange show:
  // // fadeIn/fadeOut
  // // onClose -> emit -> show = !show

  ngOnChanges(changes: SimpleChanges) {
    console.log('change', changes)
    if (changes['show'] !== undefined) {
      console.log('change', changes['show']);
    }
  }


}
