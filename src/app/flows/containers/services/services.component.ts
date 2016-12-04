import { Subject } from 'rxjs/Subject';
import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Service, ServiceStep, ServiceStepType } from './../../models';
import * as serviceHelpers from './../../utils/service.helpers';
import * as serviceStepHelpers from './../../utils/service-step.helpers';
import { ServiceDetailComponent } from './../../components/service-detail/service-detail.component';
import { FlowsStateService } from './../../services';

@Component({
  selector: 'dkt-services',
  templateUrl: 'services.component.html',
  styleUrls: ['services.component.css']
})

export class ServicesComponent implements OnInit, OnDestroy {
  @Input() selectableServiceStepType: ServiceStepType;

  ngOnDestroy$ = new Subject<boolean>();
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
    this.state.services$.takeUntil(this.ngOnDestroy$).subscribe((services) => {
        this.services = services;
      });

    // Subscribe to current selected service
    this.state.service$.takeUntil(this.ngOnDestroy$).subscribe((service) => {
        this.selectedService = service;

        if (service) {
          // Upon selecting a service:
          // Preselect the first service step if no service step is currently selected
          if (this.selectedServiceStep === null) {
            this.selectFirstServiceStep(service, this.selectableServiceStepType);
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
    this.state.step$.takeUntil(this.ngOnDestroy$).subscribe((step) => {
      if (step && step.serviceStep !== undefined) {
        this.selectedServiceStep = step.serviceStep;
      } else {
        this.selectedServiceStep = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  selectService(service: Service) {
    this.state.selectService(service);
  }

  selectServiceStep(serviceStep: ServiceStep): void {
    if (serviceStep.type !== this.selectableServiceStepType) {
      let typeName = serviceStepHelpers.getServiceStepTypeName(serviceStep);
      alert(`You can't select ${typeName} steps.`);
      return
    }

    this.state.setStepServiceStep(this.selectedService, serviceStep);
  }

  selectFirstServiceStep(service: Service, type: ServiceStepType = ServiceStepType.Action): void {
    let triggerSteps = serviceHelpers.getServiceStepsByType(service, type);
    if (triggerSteps.length) {
      this.selectServiceStep(triggerSteps[0]);
    }
  }
}