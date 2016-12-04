import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';

import { Service, ServiceStep, ServiceStepType } from './../../models';
import * as serviceHelpers from './../../utils/service.helpers';

@Component({
  selector: 'dkt-service-detail',
  templateUrl: 'service-detail.component.html',
  styleUrls: ['service-detail.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
      transition('* <=> *', animate('200ms')),
    ])
  ]
})
export class ServiceDetailComponent implements OnChanges {
  @Input() service: Service;
  @Input() selectedServiceStep: ServiceStep;
  @Input() selectableServiceStepType: ServiceStepType;
  @Output() onSelectServiceStep = new EventEmitter();

  show: boolean = false;
  triggerSteps: ServiceStep[];
  actionSteps: ServiceStep[];
  selectedTabIndex: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['service'] !== undefined) {
      this.processService(changes['service']['currentValue']);
    }
    else if (changes['selectableServiceStepType'] !== undefined) {
      this.processSelectableServiceStepType(changes['selectableServiceStepType']['currentValue'])
    }
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  processService(service) {
    if (service && service.steps) {
      this.triggerSteps = serviceHelpers.getServiceTriggerSteps(service);
      this.actionSteps = serviceHelpers.getServiceActionSteps(service);
    } else {
      this.triggerSteps = [];
      this.actionSteps = [];
    }
  }

  processSelectableServiceStepType(type) {
    this.selectedTabIndex = type == ServiceStepType.Trigger ? 0 : 1;
  }

  selectServiceStep(serviceStep) {
    this.onSelectServiceStep.emit({ serviceStep: serviceStep });
  }
}
