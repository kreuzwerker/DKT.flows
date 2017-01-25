/* tslint:disable: ter-max-len */
describe('Flows App', () => {

  describe('FlowsApp Component', () => {

    // UI
    // - should list all flow steps
    // - should show loading indicator if flow is loading
    // - should show flow header

    describe('Subscriptions', () => {
      xit('should call onFlowRouteChange() when the flowId route param changes', () => {
      });

      xit('should call onStepRouteChange() when the stepId route param changes', () => {
      });

      xit('should call onSelectFlow() when the current selected flow changes', () => {
      });

      xit('should call onSelectStep() when the current selected step changes', () => {
      });
    });

    describe('ngOnDestroy()', () => {
      xit('should unscribe all subscriptions', () => {
      });
    });

    describe('onSelectFlow()', () => {
      xit('should set flowsApp.flow', () => {
      });

      xit('should call selectRequestedStep()', () => {
      });

      xit('should trigger change detection', () => {
      });
    });

    describe('onSelectStep()', () => {
      xit('should set current step in flowsApp', () => {
      });

      xit('should trigger change detection', () => {
      });
    });

    describe('onFlowRouteChange()', () => {
      xit('should set the current selected flow to the given flowId', () => {
      });

      xit('should trigger change detection', () => {
      });
    });

    describe('onStepRouteChange()', () => {
      xit('should set requestedStepId to the new stepId param value', () => {
      });

      xit('should call selectRequestedStep()', () => {
      });

      xit('should trigger change detection', () => {
      });
    });

    describe('selectRequestedStep()', () => {
      xit('should do nothing if the current flow has no steps', () => {
      });

      xit('should select the current requested step if it can find the flow step', () => {
      });

      xit('should not select the current requested step if it cannot find the flow step', () => {
      });
    });
  });
});
