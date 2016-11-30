import { Component } from '@angular/core';

import { FlowsAppService, FlowsStateService } from './../../services'

@Component({
	templateUrl: 'flows-app.component.html',
	styleUrls: ['flows-app.component.css'],
  providers: [FlowsAppService],
})
export class FlowsAppComponent {
  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService
  ) { }
}
