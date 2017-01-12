import { Component, Input } from '@angular/core';
import { Flow } from './../../models/flow.model';

@Component({
  selector: 'dkt-flow-header',
  templateUrl: 'flow-header.component.html',
  styleUrls: ['flow-header.component.css']
})
export class FlowHeaderComponent {
  @Input() flow: Flow;
}
