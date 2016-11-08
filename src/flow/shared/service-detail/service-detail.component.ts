import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Service } from './../../models/service.model';
import { ServiceStep } from './../../models/service-step.model';

@Component({
  selector: 'dkt-service-detail',
  templateUrl: 'service-detail.component.html',
  styleUrls: ['service-detail.component.css']
})
export class ServiceDetailComponent implements OnChanges {
  @Input() service: Service;
  @Output() onClose = new EventEmitter();

  show: boolean = false;
  triggerSteps: ServiceStep[];
  actionSteps: ServiceStep[];

  ngOnChanges(changes: SimpleChanges) {
    this.processService(changes['service']['currentValue']);
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
      this.triggerSteps = service.steps.filter(step => step.type == 'trigger');
      this.actionSteps = service.steps.filter(step => step.type == 'action');
    } else {
      this.triggerSteps = [];
      this.actionSteps = [];
    }
  }
}
