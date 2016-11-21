import { Component, OnInit } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Flow, Step, ServiceStep } from '../../models'
import { FlowsStateService } from './../../flows-state.service';

@Component({
  selector: 'dkt-select-service-step',
  templateUrl: 'select-service-step.component.html',
  styleUrls: ['select-service-step.component.css'],
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
  steps: Step[];
  selectedServiceStep: ServiceStep | null;

  constructor(public route: ActivatedRoute, public state: FlowsStateService) {
    this.selectedServiceStep = null
  }

  ngOnInit() {
    this.route.params
      .map(params => params['flowId'])
      .subscribe((flowId) => {
        this.state.loadFlow(flowId);
      });
      
    this.state.flow$.subscribe((flow) => {
      this.steps = flow.steps
      this.state.selectStep(flow.steps[0]);
    });

    this.state.step$.subscribe((step) => {
      if (step.serviceStep !== undefined) {
        this.selectedServiceStep = step.serviceStep;
      } else {
        this.selectedServiceStep = null
      }
    });
  }
}
