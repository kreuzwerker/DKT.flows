import { Subject } from 'rxjs/Subject';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Provider, Service, ServiceType } from './../../models';
import * as providerHelpers from './../../utils/provider.helpers';
import * as serviceHelpers from './../../utils/service.helpers';
import { ProviderDetailComponent } from './../../components/provider-detail/provider-detail.component';
import { FlowsStateService } from './../../services';

@Component({
  selector: 'dkt-providers',
  templateUrl: 'providers.component.html',
  styleUrls: ['providers.component.css'],
  providers: [MdSnackBar]
})

export class ProvidersComponent implements OnInit, OnDestroy {
  @Input() selectableServiceType: ServiceType;
  @Output() onChangeService = new EventEmitter();

  ngOnDestroy$ = new Subject<boolean>();
  providers: Array<Provider>;
  selectedProvider: Provider;
  selectedService: Service | null;

  @ViewChild(ProviderDetailComponent) serviceDetail: ProviderDetailComponent;

  constructor(
    public state: FlowsStateService,
    public snackBar: MdSnackBar
  ) {
    this.selectedProvider = null;
    this.selectedService = null;
  }

  ngOnInit() {
    // Load all providers
    this.state.loadProviders();
    // TODO make it work with takeUntil
    // this.state.providers$.takeUntil(this.ngOnDestroy$).subscribe((providers) => {
    this.state.providers$.subscribe((providers) => {
      this.providers = providers;
    });

    // Subscribe to current selected provider
    this.state.provider$.takeUntil(this.ngOnDestroy$).subscribe((provider) => {
        this.selectedProvider = provider;

        if (provider) {
          // Upon selecting a service:
          // Preselect the first service step if no service step is currently selected
          if (this.selectedService === null) {
            this.selectFirstService(provider, this.selectableServiceType);
          }

          this.serviceDetail.open();
        } else {
          this.serviceDetail.close();
        }
      },
      (err) => console.log('error', err)
    );

    // Subscribe to current selected flow step
    this.state.step$.takeUntil(this.ngOnDestroy$).subscribe((step) => {
      if (step && step.service !== undefined) {
        this.selectedService = step.service;
      } else {
        this.selectedService = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  selectProvider(provider: Provider) {
    this.state.selectProvider(provider);
  }

  selectService(service: Service): boolean {
    if (service.type !== this.selectableServiceType) {
      let typeName = serviceHelpers.getServiceTypeName(service);
      let config = new MdSnackBarConfig();
      // TODO implement config.duration=1000 as soon as available in API
      this.snackBar.open(`You can't select ${typeName} steps.`, 'OK', config);
      return false;
    }

    this.state.setStepService(this.selectedProvider, service);
    return true;
  }

  selectFirstService(provider: Provider, type: ServiceType = ServiceType.ACTION): void {
    let triggerServices = providerHelpers.getProviderStepsByType(provider, type);
    if (triggerServices.length) {
      this.selectService(triggerServices[0]);
    }
  }

  /**
   * User initiated selection of service: select new service and signal change 
   * event (for saving the flow step).
   * 
   * @param {Service} service
   * 
   * @memberOf ProvidersComponent
   */
  changeService(service: Service): void {
    if (this.selectService(service)) {
      this.onChangeService.emit({ service: service });
    }
  }
}
