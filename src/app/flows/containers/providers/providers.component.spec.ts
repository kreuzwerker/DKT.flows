/* tslint:disable: ter-max-len */
import { Provider, Step, Service, ServiceType } from './../../models';
import { MockChangeDetectorRef, mockFlowsState, mockFlowsApp, mockStore, mockApolloStore, mockSnackBar } from './../../utils/mocks';
import { TestUtils } from './../../utils/test.helpers';
import { ProvidersComponent } from './providers.component';
import { ProviderDetailComponent } from './../../components/provider-detail/provider-detail.component';
import { FlowsStateService } from './../../services';
import * as _ from 'lodash';

describe('Flows App', () => {

  describe('Providers Component', () => {
    let component: ProvidersComponent;
    let cd: MockChangeDetectorRef;
    let utils: TestUtils;
    let state: FlowsStateService;
    let store: any;

    beforeEach(() => {
      utils = new TestUtils();
      cd = <any>new MockChangeDetectorRef();
      state = mockFlowsState;
      store = mockStore;
      component = new ProvidersComponent(cd, state, mockSnackBar);
      expect(component).toBeTruthy();

      // Mock ProviderDetail child component
      component.providerDetail = {
        open: () => {},
        close: () => {},
      } as ProviderDetailComponent;
    });


    // UI
    // - should show loading indicator if providers are loading
    // - should list providers as provider items
    // - should mark the currently selected provider
    // - should show provider detail for the current selected provider

    describe('ngOnInit()', () => {
      xit('should call onInitialLoad() once when providers have loaded and the current step is set', () => {
      });

      xit('should call onLoadProviders() when providers are loaded', () => {
      });

      xit('should trigger loading providers', () => {
      });

      xit('should call onSelectProvider() when the current selected provider changes', () => {
      });

      xit('should call onSelectStep() when the current selected step changes', () => {
      });
    });

    describe('ngOnDestroy()', () => {
      xit('should unscribe all subscriptions', () => {
      });
    });

    describe('onInitialLoad()', () => {
      it('should select the provider of the given step\'s service', () => {
        const providers = utils.createProvidersListData();
        const step = utils.createStepData();
        const expectedProvider = providers[0];
        expect(step.service.provider.id).toBe(expectedProvider.id);

        let spy = spyOn(component, 'selectProvider');
        component.onInitialLoad({providers: providers, step: step});
        expect(spy).toHaveBeenCalledWith(expectedProvider);
      });
    });

    describe('onLoadProviders()', () => {
      it('should set selected provider to given provider', () => {
        const providers = utils.createProvidersListData();
        component.onLoadProviders(providers);
        expect(component.providers).toEqual(providers);
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        const providers = utils.createProvidersListData();
        component.onLoadProviders(providers);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onSelectProvider()', () => {
      let provider: Provider;

      beforeEach(() => {
        provider = utils.createProviderData();
      });

      it('should set selected provider to given providers', () => {
        component.onSelectProvider(provider);
        expect(component.selectedProvider).toEqual(provider);
      });

      it('should call selectFirstService() if the given provider is not null and there is no service selected', () => {
        let spy = spyOn(component, 'selectFirstService');
        component.selectedService = null;
        component.onSelectProvider(provider);
        expect(spy).toHaveBeenCalled();
      });

      it('should open provider detail if the given provider is not null', () => {
        let spy = spyOn(component.providerDetail, 'open');
        component.onSelectProvider(provider);
        expect(spy).toHaveBeenCalled();
      });

      it('should close provider detail if the given provider is null', () => {
        let spy = spyOn(component.providerDetail, 'close');
        component.onSelectProvider(null);
        expect(spy).toHaveBeenCalled();
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onSelectProvider(provider);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onSelectStep()', () => {
      it('should set selected service to the given step\'s service if the step has a service set', () => {
        let step = utils.createStepData();
        component.onSelectStep(step);
        expect(component.selectedService).toEqual(step.service);
      });

      it('should set selected service to null if the given step has no service set', () => {
        component.onSelectStep(null);
        expect(component.selectedService).toBeNull();
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onSelectStep(null);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('selectProvider()', () => {
      it('should set the given provider as selected provider unless it already is the current selected provider', () => {
        let spy = spyOn(state.actions, 'selectProvider');
        const provider = utils.createProviderData();
        component.selectProvider(provider);
        expect(spy).toHaveBeenCalledWith(provider);
      });

      it('should call onSelectStep() if the given provider is the current selected provider', () => {
        const orgProvider = _.cloneDeep(mockStore.provider);
        let spy = spyOn(component, 'onSelectProvider');
        const provider = utils.createProviderData();
        // Set provider as current provider
        mockStore.provider.next(provider);
        component.selectProvider(provider);
        expect(spy).toHaveBeenCalledWith(provider);
        // Restore original state
        mockStore.provider.next(orgProvider);
      });
    });

    describe('selectService()', () => {
      it('should not select the given service but show a snackbar if the given service is not selectable', () => {
        const service = utils.createServiceData();
        component.selectableServiceType = ServiceType.ACTION;
        expect(service.type).not.toBe(ServiceType.ACTION);

        let spy = spyOn(component.snackBar, 'open');
        let spy2 = spyOn(state.actions, 'setStepService');
        component.selectService(service);
        expect(spy).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
      });

      it('should select the given service if the given service is selectable', () => {
        const service = utils.createServiceData();
        component.selectableServiceType = ServiceType.TRIGGER;
        expect(service.type).toBe(ServiceType.TRIGGER);

        let spy = spyOn(component.snackBar, 'open');
        let spy2 = spyOn(state.actions, 'setStepService');
        component.selectService(service);
        expect(spy).not.toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
      });
    });

    describe('changeService()', () => {
      it('should emit an onChangeService event with the correct params if the given service could be selected', () => {
        const service = utils.createServiceData();
        // Mock result from selectService()
        component.selectService = (s: Service): boolean => true;
        let spy = spyOn(component.onChangeService, 'emit');
        component.changeService(service);
        expect(spy).toHaveBeenCalledWith({service: service});
      });
    });
  });
});
