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

    describe('selectFlow()', () => {
      xit('should dispatch an action to set the flow loading flag', () => {
      });

      xit('should dispatch an action to set the flow with the given id as current flow', () => {
      });

      xit('should do nothing if the request flow is the current flow', () => {
      });
    });

    describe('createFlow()', () => {
      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag', () => {
      });

      xit('should call the API to create a new flow with the given data', () => {
      });

      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag when saving was successful', () => {
      });
    });

    describe('deleteFlowStep()', () => {
      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag', () => {
      });

      xit('should call the API to delete the given flow.', () => {
      });

      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag when saving was successful', () => {
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

    describe('addFlowStep()', () => {
      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag', () => {
      });

      xit('should call the API to add the current step with the given data', () => {
      });

      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag when saving was successful', () => {
      });
    });

    describe('removeFlowStep()', () => {
      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag', () => {
      });

      xit('should call the API to remove the current step with the given data', () => {
      });

      xit('should dispatch an action to set the flow saving flag and to unset the flow saved flag when saving was successful', () => {
      });
    });

    describe('testFlowStep()', () => {
      xit('should dispatch event: test step is loading', () => {
      });

      xit('should call the API to test the given step with the given payload', () => {
      });

      xit('should dispatch event: test step has finished with the given result', () => {
      });
    });
  });
});
