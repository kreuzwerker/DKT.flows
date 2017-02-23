import { FlowsApiService } from './flows-api.service';
import { TestUtils } from './../utils/test.helpers';
import { Angular2Apollo } from 'angular2-apollo';
import { Http } from '@angular/http';

describe('Flows App', () => {

  describe('FlowsApi Service', () => {
    let service: FlowsApiService;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      service = new FlowsApiService({} as Angular2Apollo, {} as Http);
      expect(service).toBeTruthy();
    });

    describe('getFlow()', () => {
      xit('should query the API for a flow with the requested id', () => {
        // TODO waiting for https://github.com/apollographql/apollo-test-utils
      });
    });

    describe('getFlows()', () => {
      xit('should query the API for a list of flows', () => {
      });
    });

    describe('createFlow()', () => {
      xit('should query the API with a mutation of a new flow', () => {
      });

      xit('should append the new flow to the current flows', () => {
      });
    });

    describe('deleteFlow()', () => {
      xit('should query the API with a mutation of a deleted flow', () => {
      });

      xit('should remove the deleted flow from the current flows', () => {
      });
    });

    describe('getProviders()', () => {
      xit('should query the API for a list of providers with services', () => {
      });
    });

    describe('udpateStep()', () => {
      xit('should query the API with a mutation of the given step', () => {
      });
    });

    describe('addFlowStep()', () => {
      xit('should query the API with a mutation of a new step', () => {
      });

      xit('should append the new flow step to the current flow steps', () => {
      });
    });

    describe('removeFlowStep()', () => {
      xit('should query the API with a mutation of a deleted step', () => {
      });

      xit('should remove the deleted flow step from the current flow steps', () => {
      });
    });

    describe('optimisticallyAddStep()', () => {
      it('should return an optimistic response object for the given step.', () => {
        const step = utils.createStepData();
        const res = service['optimisticallyAddStep'](step);
        expect(res.__typename).toBe('Mutation');
        expect(res.createStep.__typename).toBe('Step');
        expect(res.createStep.id).toMatch(/new-/);
        expect(res.createStep.position).toBe(step.position);
        expect(res.createStep.createdAt).toBeDefined();
        expect(res.createStep.service).toBe(step.service);
      });
    });

    describe('pushNewFlowStep()', () => {
      it('should append the given step to the current list of flow steps.', () => {
        const step = utils.createStepData();
        let state = {
          Flow: {
            steps: []
          }
        };
        const newState = service['pushNewFlowStep'](state, step);
        expect(newState.Flow.steps).toContain(step);
      });
    });

    describe('optimisticallyRemoveStep()', () => {
      it('should return an optimistic response object for the given step.', () => {
        const step = utils.createStepData();
        const res = service['optimisticallyRemoveStep'](step);
        expect(res.__typename).toBe('Mutation');
        expect(res.deleteStep.__typename).toBe('Step');
        expect(res.deleteStep.id).toBe(step.id);
        expect(res.deleteStep.position).toBe(step.position);
        expect(res.deleteStep.service).toBe(step.service);
      });
    });

    describe('removeDeletedFlowStep()', () => {
      it('should remove the given step from the current list of flow steps.', () => {
        const step = utils.createStepData();
        let state = {
          Flow: {
            steps: [step]
          }
        };
        const newState = service['removeDeletedFlowStep'](state, step);
        expect(newState.Flow.steps).not.toContain(step);
      });
    });
  });
});
