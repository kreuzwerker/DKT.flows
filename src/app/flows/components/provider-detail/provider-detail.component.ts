import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';

import { Provider, Service, ServiceType } from './../../models';
import * as providerHelpers from './../../utils/provider.helpers';

@Component({
  selector: 'dkt-provider-detail',
  templateUrl: 'provider-detail.component.html',
  styleUrls: ['provider-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  triggerServices: Service[] = [];
  actionServices: Service[] = [];
  selectedTabIndex: number = 0;

  constructor(
    private cd: ChangeDetectorRef,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['provider'] !== undefined) {
      this.processProvider(changes['provider']['currentValue']);
    }
    if (changes['selectableServiceType'] !== undefined) {
      this.processSelectableServiceType(changes['selectableServiceType']['currentValue']);
    }
    this.cd.markForCheck();
  }

  open() {
    this.show = true;
    this.cd.markForCheck();
  }

  close() {
    this.show = false;
    this.cd.markForCheck();
  }

  processProvider(provider: Provider = undefined) {
    if (provider && provider.services) {
      this.triggerServices = providerHelpers.getProviderTriggerServices(provider);
      this.actionServices = providerHelpers.getProviderActionServices(provider);
    } else {
      this.triggerServices = [];
      this.actionServices = [];
    }
  }

  processSelectableServiceType(type: ServiceType) {
    this.selectedTabIndex = type === ServiceType.TRIGGER ? 0 : 1;
  }

  selectService(service: Service) {
    this.onSelectService.emit({ service: service });
  }
}
