import { Subject } from 'rxjs/Subject';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material'

import { Provider, ServiceStep, ServiceStepType } from './../../models';
import * as providerHelpers from './../../utils/provider.helpers';
import * as serviceStepHelpers from './../../utils/service-step.helpers';
import { ProviderDetailComponent } from './../../components/provider-detail/provider-detail.component';
import { FlowsStateService } from './../../services';

@Component({
  selector: 'dkt-providers',
  templateUrl: 'providers.component.html',
  styleUrls: ['providers.component.css'],
  providers: [MdSnackBar]
})

export class ProvidersComponent implements OnInit, OnDestroy {
  @Input() selectableServiceStepType: ServiceStepType;
  @Output() onChangeServiceStep = new EventEmitter();

  ngOnDestroy$ = new Subject<boolean>();
  providers: Array<Provider>;
  selectedProvider: Provider;
  selectedServiceStep: ServiceStep | null;

  @ViewChild(ProviderDetailComponent) serviceDetail: ProviderDetailComponent;

  constructor(
    public state: FlowsStateService,
    public snackBar: MdSnackBar
  ) {
    this.selectedProvider = null;
    this.selectedServiceStep = null;
  }

  ngOnInit() {
    // Load all providers
    this.state.loadProviders();
    this.state.providers$.takeUntil(this.ngOnDestroy$).subscribe((providers) => {
        this.providers = providers;
      });

    // Subscribe to current selected provider
    this.state.provider$.takeUntil(this.ngOnDestroy$).subscribe((provider) => {
        this.selectedProvider = provider;

        if (provider) {
          // Upon selecting a service:
          // Preselect the first service step if no service step is currently selected
          if (this.selectedServiceStep === null) {
            this.selectFirstServiceStep(provider, this.selectableServiceStepType);
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

  selectProvider(provider: Provider) {
    this.state.selectProvider(provider);
  }

  selectServiceStep(serviceStep: ServiceStep): boolean {
    if (serviceStep.type !== this.selectableServiceStepType) {
      let typeName = serviceStepHelpers.getServiceStepTypeName(serviceStep);
      let config = new MdSnackBarConfig();
      // TODO implement config.duration=1000 as soon as available in API
      this.snackBar.open(`You can't select ${typeName} steps.`, 'OK', config);
      return false;
    }

    this.state.setStepServiceStep(this.selectedProvider, serviceStep);
    return true;
  }

  selectFirstServiceStep(provider: Provider, type: ServiceStepType = ServiceStepType.Action): void {
    let triggerSteps = providerHelpers.getProviderStepsByType(provider, type);
    if (triggerSteps.length) {
      this.selectServiceStep(triggerSteps[0]);
    }
  }

  /**
   * User initiated selection of service: select new service and signal change 
   * event (for saving the flow step).
   * 
   * @param {ServiceStep} serviceStep
   * 
   * @memberOf ProvidersComponent
   */
  changeServiceStep(serviceStep: ServiceStep): void {
    if (this.selectServiceStep(serviceStep)) {
      this.onChangeServiceStep.emit({ serviceStep: serviceStep });
    }
  }
}