import { Subject } from 'rxjs/Subject';
import { Observable, Subscription } from 'rxjs';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import * as _ from 'lodash';

import { Provider, Step, Service, ServiceType } from './../../models';
import * as providerHelpers from './../../utils/provider.helpers';
import * as serviceHelpers from './../../utils/service.helpers';
import { ProviderDetailComponent } from './../../components/provider-detail/provider-detail.component';
import { FlowsStateService } from './../../services';

@Component({
  selector: 'dkt-providers',
  templateUrl: 'providers.component.html',
  styleUrls: ['providers.component.css'],
  providers: [MdSnackBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProvidersComponent implements OnInit, OnDestroy {
  @Input() selectableServiceType: ServiceType;
  @Output() onChangeService = new EventEmitter();

  ngOnDestroy$ = new Subject<boolean>();
  providersSub$: Subscription;

  providers: Array<Provider> = [];
  selectedProvider: Provider = null;
  selectedService: Service | null = null;

  @ViewChild(ProviderDetailComponent) providerDetail: ProviderDetailComponent;

  constructor(
    private cd: ChangeDetectorRef,
    public state: FlowsStateService,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    // Subscribe to current selected flow step
    this.state.select('step').takeUntil(this.ngOnDestroy$).subscribe(
      this.onSelectStep.bind(this),
      (err) => console.log('error', err)
    );

    // NB onInitialLoad must be subscribed _after_ onSelectStep so selectedService
    // gets set before calling onInitialLoad.
    Observable.combineLatest(
      this.state.providers$,
      this.state.select('step')
        .filter(step => step !== null && step.service && step.service.provider),
      (providers, step) => ({providers: providers, step: step})
    ).take(1).subscribe(
      this.onInitialLoad.bind(this),
      (err) => console.log('error', err)
    );

    // Subscribe to list of providers
    this.providersSub$ = this.state.providers$.subscribe(
      this.onLoadProviders.bind(this),
      (err) => console.log('error', err)
    );

    // Load all providers
    this.state.loadProviders();

    // Subscribe to current selected provider
    this.state.select('provider').takeUntil(this.ngOnDestroy$).subscribe(
      this.onSelectProvider.bind(this),
      (err) => console.log('error', err)
    );
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
    this.providersSub$.unsubscribe();
  }

  onInitialLoad({providers, step}) {
    let provider: Provider = _.find<Provider>(providers, (p) => p.id === step.service.provider.id);
    this.selectProvider(provider);
  }

  onLoadProviders(providers: Provider[]) {
    this.providers = providers;
    this.cd.markForCheck();
  }

  onSelectProvider(provider: Provider) {
    this.selectedProvider = provider;

    if (provider) {
      // Upon selecting a provider:
      // Preselect the first service step if no service step is currently selected
      if (this.selectedService === null) {
        this.selectFirstService(provider, this.selectableServiceType);
      }

      this.providerDetail.open();
    } else {
      this.providerDetail.close();
    }
    this.cd.markForCheck();
  }

  onSelectStep(step: Step) {
    if (step && step.service) {
      this.selectedService = step.service;
      this.providerDetail.open();
    } else {
      this.selectedService = null;
      this.providerDetail.close();
    }
    this.cd.markForCheck();
  }

  // User initiated selection of provider
  selectProvider(provider: Provider) {
    if (this.state.get('provider') !== provider) {
      // Select a new provider, which will call onSelectProvider reactively
      this.state.dispatch(this.state.actions.selectProvider(provider));
    } else {
      // The given provider is already set. Selecting it again would not emit
      // a change event because of distinctUntilChanged() in state.select().
      // Thus we need to trigger the callback manually.
      this.onSelectProvider(provider);
    }
  }

  selectService(service: Service): boolean {
    if (service.type !== this.selectableServiceType) {
      let typeName = serviceHelpers.getServiceTypeName(service);
      let config = new MdSnackBarConfig();
      config.duration = 2000;
      this.snackBar.open(`You can't select ${typeName} steps.`, 'OK', config);
      return false;
    }

    this.state.dispatch(this.state.actions.setStepService(this.selectedProvider, service));
    return true;
  }

  selectFirstService(provider: Provider, type: ServiceType = ServiceType.ACTION): void {
    let services = providerHelpers.getProviderServicesByType(provider, type);
    if (services.length) {
      this.changeService(services[0]);
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
