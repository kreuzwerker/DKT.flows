import { Component } from '@angular/core';

import { FlowsAppService, FlowsStateService } from './../../services'

@Component({
	selector: 'dkt-flow',
	templateUrl: 'flow.component.html',
	styleUrls: ['flow.component.css'],
  providers: [FlowsAppService],
})
export class FlowComponent {
  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService
  ) { }
}
