import { FlowsApiService } from './flows-api.service';
import { TestUtils } from './../utils/test.helpers';
import { Apollo } from 'apollo-angular';
import { Http } from '@angular/http';
import { sortBy } from 'lodash';

describe('Flows App', () => {

  describe('FlowsApi Service', () => {
    let service: FlowsApiService;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      service = new FlowsApiService({} as Apollo, {} as Http);
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

    describe('testFlowStep()', () => {
      xit('should query the API with a mutation to test a step', () => {
      });

      xit('should set the step as successfully tested', () => {
      });
    });

    describe('reduceGetFlow()', () => {
      it('should sort the steps of the given flow by position.', () => {
        const flow = utils.createFlowData();
        // Mix up positions
        flow.steps[0].position = 2;
        flow.steps[1].position = 0;
        flow.steps[2].position = 1;
        let state = {
          Flow: flow
        };
        const newState = service['reduceGetFlow'](state);
        expect(newState.Flow.steps[0].position).toEqual(0);
        expect(newState.Flow.steps[1].position).toEqual(1);
        expect(newState.Flow.steps[2].position).toEqual(2);
      });
    });

    describe('optimisticallyAddFlow()', () => {
      it('should return an optimistic response object for the given flow.', () => {
        const flow = utils.createFlowData();
        const res = service['optimisticallyAddFlow'](flow);
        expect(res.__typename).toBe('Mutation');
        expect(res.createFlow.__typename).toBe('Flow');
        expect(res.createFlow.id).toBe(flow.id);
        expect(res.createFlow.name).toBe(flow.name);
        expect(res.createFlow.description).toBe(flow.description);
      });
    });

    describe('pushNewFlow()', () => {
      it('should append the given flow to the current list of flows.', () => {
        const flow = utils.createFlowData();
        let state = {
          allFlows: []
        };
        const newState = service['pushNewFlow'](state, flow);
        expect(newState.allFlows).toContain(flow);
      });
    });

    describe('optimisticallyRemoveFlow()', () => {
      it('should return an optimistic response object for the given flow.', () => {
        const flow = utils.createFlowData();
        const res = service['optimisticallyRemoveFlow'](flow.id);
        expect(res.__typename).toBe('Mutation');
        expect(res.deleteFlow.__typename).toBe('Flow');
        expect(res.deleteFlow.id).toBe(flow.id);
      });
    });

    describe('removeDeletedFlow()', () => {
      it('should remove the given flow from the current list of flow.', () => {
        const flow = utils.createFlowData();
        let state = {
          allFlows: [flow]
        };
        const newState = service['removeDeletedFlow'](state, flow);
        expect(newState.allFlows).not.toContain(flow);
      });
    });

    describe('optimisticallyAddStep()', () => {
      it('should return an optimistic response object for the given step.', () => {
        const step = utils.createStepData();
        const res = service['optimisticallyAddStep'](step, []);
        expect(res.__typename).toBe('Mutation');
        expect(res.createStep.__typename).toBe('Step');
        expect(res.createStep.id).toBe(step.id);
        expect(res.createStep.position).toBe(step.position);
        expect(res.createStep.service).toBe(step.service);
        expect(res.deleteStep.flow.id).toEqual(step.flow.id);
        expect(res.deleteStep.flow.draft).toBeTruthy();
        expect(res.deleteStep.flow.steps).toEqual([]);
      });
    });

    describe('generateFlowStepsPositions()', () => {
      it('should generate flow steps positions after inserting a new step.', () => {
        const step = utils.createStepData('new', 1);
        let flow = utils.createFlowData();
        flow.steps.push(step);
        let updatedSteps = service['generateFlowStepsPositions'](flow, step);
        updatedSteps = sortBy(updatedSteps, 'position');
        expect(updatedSteps[0].position).toEqual(0);
        expect(updatedSteps[1].position).toEqual(1);
        expect(updatedSteps[2].position).toEqual(2);
        expect(updatedSteps[3].position).toEqual(3);
      });
    });

    describe('regenerateFlowStepsPositions()', () => {
      it('should generate flow steps positions after removing a step.', () => {
        let flow = utils.createFlowData();
        let removedStepId = flow.steps[1].id;
        flow.steps = flow.steps.filter(step => step.id !== removedStepId);
        expect(flow.steps.length).toEqual(2);
        let updatedSteps = service['regenerateFlowStepsPositions'](flow);
        updatedSteps = sortBy(updatedSteps, 'position');
        expect(updatedSteps[0].position).toEqual(0);
        expect(updatedSteps[1].position).toEqual(1);
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

    describe('updateFlowStepsPositions()', () => {
      it('should update the current flow steps positions.', () => {
        const step = utils.createStepData();
        const state = {
          Flow: {
            steps: [
              utils.createStepData('1', 0),
              utils.createStepData('2', 1),
              utils.createStepData('3', 2),
            ]
          }
        };
        const updatedSteps = [
          utils.createStepData('1', 2),
          utils.createStepData('2', 1),
          utils.createStepData('3', 0),
        ];
        const newState = service['updateFlowStepsPositions'](state, updatedSteps);
        expect(newState.Flow.steps[0].position).toEqual(2);
        expect(newState.Flow.steps[1].position).toEqual(1);
        expect(newState.Flow.steps[2].position).toEqual(0);
      });
    });

    describe('optimisticallyRemoveStep()', () => {
      it('should return an optimistic response object for the given step.', () => {
        const step = utils.createStepData();
        const res = service['optimisticallyRemoveStep'](step, []);
        expect(res.__typename).toBe('Mutation');
        expect(res.deleteStep.__typename).toBe('Step');
        expect(res.deleteStep.id).toBe(step.id);
        expect(res.deleteStep.flow.id).toEqual(step.flow.id);
        expect(res.deleteStep.flow.draft).toBeTruthy();
        expect(res.deleteStep.flow.steps).toEqual([]);
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

    describe('updateTestedFlowStep()', () => {
      it('should update the given step\'s tested property with step test\'s result.', () => {
        let step = utils.createStepData();
        step.tested = false;
        let state = {
          Flow: {
            steps: [step]
          }
        };
        const stepTest = utils.createStepTestData(step.id);
        const newState = service['updateTestedFlowStep'](state, stepTest);
        expect(newState.Flow.steps[0].tested).toBeTruthy();
      });
    });
  });
});
