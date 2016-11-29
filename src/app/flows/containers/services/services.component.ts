import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Service, ServiceStep } from './../../models';
import * as serviceHelpers from './../../utils/service.helpers';
import { ServiceDetailComponent } from './../../components/service-detail/service-detail.component';
import { FlowsStateService } from './../../services';

@Component({
  selector: 'dkt-services',
  templateUrl: 'services.component.html',
  styleUrls: ['services.component.css']
})

export class ServicesComponent implements OnInit {
  @Input() selectableServiceStepTypes: Array<string>;

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
        this.services = services;
      });

      // Subscribe to current selected service
      this.state.service$.subscribe((service) => {
        this.selectedService = service;

        if (service) {
          // Upon selecting a service:
          // Preselect the first service step if no service step is currently selected
          if (this.selectedServiceStep === null) {
            this.selectFirstServiceStep(service, 'trigger');
          }

          this.serviceDetail.open();
        }
        else {
          this.serviceDetail.close();
        }
      },
      (err) => console.log('error', err)
    );

    // Subscribe to current selected flow step
    this.state.step$.subscribe((step) => {
      if (step && step.serviceStep !== undefined) {
        this.selectedServiceStep = step.serviceStep;
      } else {
        this.selectedServiceStep = null;
      }
    });
  }

  selectService(service: Service) {
    this.state.selectService(service);
  }

  selectServiceStep(serviceStep: ServiceStep): void {
    if (!this.selectableServiceStepTypes.includes(serviceStep.type)) {
      alert(`You can't select ${serviceStep.type} steps.`);
      return
    }

    this.state.setStepServiceStep(this.selectedService, serviceStep);
  }

  selectFirstServiceStep(service: Service, type: string = 'action'): void {
    let triggerSteps = serviceHelpers.getServiceStepsByType(service, type);
    if (triggerSteps.length) {
      this.selectServiceStep(triggerSteps[0]);
    }
  }
}