import { Component, OnInit, ViewChild } from '@angular/core';

import { Service, ServiceStep } from './../../models';
import * as serviceHelpers from './../../utils/service.helpers';
import { ServiceDetailComponent } from './../../components/service-detail/service-detail.component';
import { FlowsStateService } from './../../flows-state.service';

@Component({
  selector: 'dkt-services',
  templateUrl: 'services.component.html',
  styleUrls: ['services.component.css']
})

export class ServicesComponent implements OnInit {
  services: Array<Service>;
  selectedService: Service;
  selectedServiceStep: ServiceStep | null;

  @ViewChild(ServiceDetailComponent) serviceDetail: ServiceDetailComponent;

  constructor(public state: FlowsStateService) {
    this.selectedService = null;
    this.selectedServiceStep = null;
  }

  ngOnInit() {
    // Load all services
    this.state.loadServices();
    this.state.services$.subscribe((services) => {
      this.services = services
    });

    // Subscribe to current selected flow step
    this.state.step$.subscribe((step) => {
      if (step.serviceStep !== undefined) {
        this.selectedServiceStep = step.serviceStep;
      } else {
        this.selectedServiceStep = null
      }
    });
  }

  selectService(service: Service) {
    // Upon selecting a service:
    // Set the current service as selected 
    this.selectedService = service;
    // Preselect the first service step if no service step is currently selected
    if (this.selectedServiceStep === null) {
      this.selectFirstServiceStep(service, 'trigger');
    }
    // Open service detail dialog
    this.serviceDetail.open();
  }

  unselectService(): void {
    this.selectedService = null;
  }

  selectServiceStep(serviceStep: ServiceStep): void {
    this.state.setStepServiceStep(this.selectedService, serviceStep);
  }

  selectFirstServiceStep(service: Service, type: string = 'action'): void {
    let triggerSteps = serviceHelpers.getServiceStepsByType(service, type);
    if (triggerSteps.length) {
      this.selectServiceStep(triggerSteps[0]);
    }
  }
}