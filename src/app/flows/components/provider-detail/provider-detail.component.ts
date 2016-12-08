import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';

import { Provider, ServiceStep, ServiceStepType } from './../../models';
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
  @Input() selectedServiceStep: ServiceStep;
  @Input() selectableServiceStepType: ServiceStepType;
  @Output() onSelectServiceStep = new EventEmitter();

  show: boolean = false;
  triggerSteps: ServiceStep[];
  actionSteps: ServiceStep[];
  selectedTabIndex: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['provider'] !== undefined) {
      this.processProvider(changes['provider']['currentValue']);
    }
    else if (changes['selectableServiceStepType'] !== undefined) {
      this.processSelectableServiceStepType(changes['selectableServiceStepType']['currentValue'])
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
      this.triggerSteps = providerHelpers.getProviderTriggerSteps(provider);
      this.actionSteps = providerHelpers.getProviderActionSteps(provider);
    } else {
      this.triggerSteps = [];
      this.actionSteps = [];
    }
  }

  processSelectableServiceStepType(type) {
    this.selectedTabIndex = type == ServiceStepType.Trigger ? 0 : 1;
  }

  selectServiceStep(serviceStep) {
    this.onSelectServiceStep.emit({ serviceStep: serviceStep });
  }
}
