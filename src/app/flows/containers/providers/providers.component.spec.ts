/* tslint:disable: ter-max-len */
describe('Flows App', () => {

  describe('Providers Component', () => {

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
      xit('should set providers to given providers', () => {
      });

      xit('should trigger change detection', () => {
      });
    });

    describe('onLoadProviders()', () => {
      xit('should set selected provider to given provider', () => {
      });

      xit('should call selectFirstService() if the given provider is not null and there is no service selected', () => {
      });

      xit('should open provider detail if the given provider is not null', () => {
      });

      xit('should close provider detail if the given provider is null', () => {
      });

      xit('should trigger change detection', () => {
      });
    });

    describe('onSelectStep()', () => {
      xit('should set selected service to the given step\'s service if the step has a service set', () => {
      });

      xit('should set selected service to null if the given step has no service set', () => {
      });

      xit('should trigger change detection', () => {
      });
    });

    describe('selectProvider()', () => {
      xit('should set the given provider as selected provider unless it already is the current selected provider', () => {
      });

      xit('should call onSelectStep() if the given provider is the current selected provider', () => {
      });
    });

    describe('selectService()', () => {
      xit('should not select the given service but show a snackbar if the given service is not selectable', () => {
      });

      xit('should select the given service if the given service is selectable', () => {
      });
    });

    describe('changeService()', () => {
      xit('should emit an onChangeService event with the correct params if the given service could be selected', () => {
      });
    });
  });
});
