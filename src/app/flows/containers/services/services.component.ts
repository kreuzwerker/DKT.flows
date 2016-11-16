import { Component, OnInit, ViewChild } from '@angular/core';

import { Service, ServiceStep } from './../../models';
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

  @ViewChild(ServiceDetailComponent) serviceDetail: ServiceDetailComponent;

  constructor(public state: FlowsStateService) {
    this.selectedService = null;
  }

  ngOnInit() {
    this.state.loadServices();
    this.state.services$.subscribe((services) => {
      this.services = services
    });
  }

  selectService(service: Service) {
    // Set the current service as selected and open service detail dialog
    this.selectedService = service;
    this.serviceDetail.open();
  }

  unselectService() {
    this.selectedService = null;
  }

  selectServiceStep(serviceStep: ServiceStep) {
    this.state.setStepServiceStep(this.selectedService, serviceStep);
  }
}