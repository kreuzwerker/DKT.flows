import { Component, OnInit, ViewChild } from '@angular/core';
import { Service } from './../../models/service.model';
import { ServiceStep } from './../../models/service-step.model';
import { ServiceDetailComponent } from './../service-detail/service-detail.component';

export const SERVICES: Array<Service> = [
  { name: 'RSS', group: 'DKT native app', description: 'RSS service steps.', 'icon': 'rss_feed',
    steps: [
      { name: 'New item in RSS feed', description: 'Triggers on new RSS feed items.', type: 'trigger' },
      { name: 'New kitten in feed', description: 'Triggers on new RSS feed items which feature a kitten.', type: 'trigger' },

      { name: 'Make coffee', description: 'Makes a delicious freshly brewed organic coffee.', type: 'action' },
      { name: 'Sing hallelujah', description: 'Praises the lord.', type: 'action' },
    ],
  },
  { name: 'Email', group: 'DKT native app', description: 'Email service steps.', 'icon': 'mail'},
  { name: 'Filter', group: 'DKT native app', description: 'Filter service steps.', 'icon': 'filter_list'},
]

@Component({
  selector: 'dkt-services',
  templateUrl: 'services.component.html',
  styleUrls: ['services.component.css']
})

export class ServicesComponent implements OnInit {
  services: Array<Service>;
  selectedService: Service;

  @ViewChild(ServiceDetailComponent) serviceDetail: ServiceDetailComponent;

  constructor() {
    this.services = SERVICES;
    this.selectedService = null;
  }

  ngOnInit() { }

  selectService(service: Service) {
    // Set the current service as selected and open service detail dialog
    this.selectedService = service;
    this.serviceDetail.open();
  }

  unselectService() {
    this.selectedService = null;
  }

  selectServiceStep(serviceStep: ServiceStep) {
    console.log(serviceStep);
  }
}