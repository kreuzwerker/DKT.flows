import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/animations';

import { Provider, Service, ServiceType } from './../../models';
import * as providerHelpers from './../../utils/provider.helpers';

@Component({
  selector: 'dkt-provider-detail',
  templateUrl: 'provider-detail.component.html',
  styleUrls: ['provider-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('showing' , style({ opacity: 1, transform: 'scaleY(1.0) translateX(-50%)' })),
      state('hiding', style({ opacity: 0, transform: 'scaleY(0.0) translateX(-50%)' })),
      transition('* <=> *', animate('200ms ease-out')),
    ])
  ]
})
export class ProviderDetailComponent implements OnChanges {
  @Input() provider: Provider;
  @Input() selectedService: Service;
  @Input() selectableServiceType: ServiceType;
  @Output() onSelectService = new EventEmitter();

  dialogState: string = 'hiding';
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
    this.dialogState = 'showing';
    this.cd.markForCheck();
  }

  close() {
    this.dialogState = 'hiding';
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
