/* tslint:disable: ter-max-len */
describe('Flows App', () => {

  describe('FlowsState Service', () => {
    xit('should be initialized with correct properties', () => {
    });

    describe('Subscriptions', () => {
      xit('should fetch the list of flows', () => {
      });

      xit('should fetch the current flow when flowId gets set', () => {
      });

      xit('should fetch the list of providers when loading gets triggered', () => {
      });
    });

    describe('setStep()', () => {
      xit('should set the current step to the given step', () => {
      });

      xit('should set the current stepTypeName from the given step', () => {
      });
    });

    describe('select()', () => {
      xit('should return a state from the store as an observable for the given key', () => {
      });
    });

    describe('get()', () => {
      xit('should return the current value of state from the store for the given key', () => {
      });
    });

    describe('selectFlow()', () => {
      xit('should dispatch an action to set the flow loading flag', () => {
      });

      xit('should dispatch an action to set the flow with the given id as current flow', () => {
      });

      xit('should do nothing if the request flow is the current flow', () => {
      });
    });

    describe('saveFlow()', () => {
      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag', () => {
      });
    });

    describe('saveFlowStep()', () => {
      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag', () => {
      });

      xit('should call the API to update the current step with the given data', () => {
      });

      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag when saving was successful', () => {
      });
    });
  });
});
