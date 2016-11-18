import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { Service, ServiceStep } from './../../models';
import * as serviceHelpers from './../../utils/service.helpers';

@Component({
  selector: 'dkt-service-detail',
  templateUrl: 'service-detail.component.html',
  styleUrls: ['service-detail.component.css']
})
export class ServiceDetailComponent implements OnChanges {
  @Input() service: Service;
  @Input() selectedServiceStep: ServiceStep;
  @Output() onClose = new EventEmitter();
  @Output() onSelectServiceStep = new EventEmitter();

  show: boolean = false;
  triggerSteps: ServiceStep[];
  actionSteps: ServiceStep[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['service'] !== undefined) {
      this.processService(changes['service']['currentValue']);
    }
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
    this.onClose.emit();
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

  selectServiceStep(serviceStep) {
    this.onSelectServiceStep.emit({ serviceStep: serviceStep });
  }
}
