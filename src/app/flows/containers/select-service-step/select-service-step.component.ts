import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';

import { FlowsAppService, FlowsStateService } from './../../services'
import { ServiceStep } from './../../models'

@Component({
  selector: 'dkt-select-service-step',
  templateUrl: 'select-service-step.component.html',
  styleUrls: ['select-service-step.component.css'],
  providers: [FlowsAppService],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-out')
      ]),
      transition('* => void', [
        animate('200ms ease-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})

export class SelectServiceStepComponent  {
  selectedServiceStep: ServiceStep | null = null;
  selectableServiceStepTypes: Array<string> = ['action'];

  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService
  ) {
    // Current selected step
    this.state.step$.subscribe((step) => {
      this.selectedServiceStep = (step && step.serviceStep !== undefined)
        ? step.serviceStep 
        : null;

      // Allow 'trigger' services steps only at the beginning of a flow
      this.selectableServiceStepTypes = (step && step.position === 0) 
        ? ['trigger']
        : ['action'];
    });
  }
}
