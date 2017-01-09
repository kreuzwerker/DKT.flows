import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';

import { Provider, Service, ServiceType } from './../../models';
import * as providerHelpers from './../../utils/provider.helpers';

@Component({
  selector: 'dkt-provider-detail',
  templateUrl: 'provider-detail.component.html',
  styleUrls: ['provider-detail.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)'  })),
      transition('* <=> *', animate('200ms')),
    ])
  ]
})
export class ProviderDetailComponent implements OnChanges {
  @Input() provider: Provider;
  @Input() selectedService: Service;
  @Input() selectableServiceType: ServiceType;
  @Output() onSelectService = new EventEmitter();

  show: boolean = false;
  triggerServices: Service[];
  actionServices: Service[];
  selectedTabIndex: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['provider'] !== undefined) {
      this.processProvider(changes['provider']['currentValue']);
    }
    else if (changes['selectableServiceType'] !== undefined) {
      this.processSelectableServiceType(changes['selectableServiceType']['currentValue'])
    }
  }

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  processProvider(provider) {
    if (provider && provider.steps) {
      this.triggerServices = providerHelpers.getProviderTriggerSteps(provider);
      this.actionServices = providerHelpers.getProviderActionSteps(provider);
    } else {
      this.triggerServices = [];
      this.actionServices = [];
    }
  }

  processSelectableServiceType(type) {
    this.selectedTabIndex = type == ServiceType.Trigger ? 0 : 1;
  }

  selectService(service) {
    this.onSelectService.emit({ service: service });
  }
}