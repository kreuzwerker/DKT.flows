/* tslint:disable: ter-max-len */
import { TestUtils } from './test.helpers';
import * as helpers from './flow.helpers';
import * as stepHelpers from './step.helpers';
import { Flow, ServiceType } from './../models';

describe('Flows App', () => {

  describe('Flow Helpers', () => {
    let flow: Flow;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      flow = utils.createFlowData();
    });

    describe('getFlowTriggerStep()', () => {
      it('should return the trigger step from the given flow', () => {
        let trigger = helpers.getFlowTriggerStep(flow);
        expect(stepHelpers.getStepServiceType(trigger)).toBe(ServiceType.TRIGGER);
      });
    });

    describe('flowHasTriggerStep()', () => {
      it('should return true if the given flow has a trigger step', () => {
        expect(helpers.flowHasTriggerStep(flow)).toBeTruthy();
      });
    });

    describe('getFlowActionStep()', () => {
      it('should return the first action step from the given flow', () => {
        let action = helpers.getFlowActionStep(flow);
        expect(stepHelpers.getStepServiceType(action)).toBe(ServiceType.ACTION);
      });
    });

    describe('flowHasActionStep()', () => {
      it('should return true if the given flow has an action step', () => {
        expect(helpers.flowHasActionStep(flow)).toBeTruthy();
      });
    });

    describe('flowIsActivated()', () => {
      it('should return true if the given flow is activated', () => {
        expect(helpers.flowIsActivated(flow)).toBeFalsy();
        flow.active = true;
        expect(helpers.flowIsActivated(flow)).toBeTruthy();
      });
    });

    describe('flowHasError()', () => {
      it('should return true if the given flow has had an erroneous last flow run', () => {
        flow.lastFlowRun = utils.createFlowRunData('1', 'error');
        expect(helpers.flowHasError(flow)).toBeTruthy();
        flow.lastFlowRun = utils.createFlowRunData('1', 'success');
        expect(helpers.flowHasError(flow)).toBeFalsy();
      });
    });

    describe('flowIsInDraft()', () => {
      it('should return true if the given flow is in draft state', () => {
        flow.draft = true;
        expect(helpers.flowIsInDraft(flow)).toBeTruthy();
      });
    });

    describe('flowIsTriggered()', () => {
      it('should return false if the given flow is not triggered', () => {
        expect(helpers.flowIsTriggered(flow)).toBeFalsy();
      });
    });

    describe('flowIsExecutable()', () => {
      it('should return false if given flow has less than 2 steps', () => {
        flow.steps = flow.steps.slice(0, 1);
        expect(helpers.flowIsExecutable(flow)).toBeFalsy();
      });

      it('should return false if not all flow steps are executable', () => {
        // Make the first step non-executable by removing its service
        flow.steps[0].service = null;
        expect(helpers.flowIsExecutable(flow)).toBeFalsy();
      });

      it('should return true if all flow steps are executable', () => {
        expect(helpers.flowIsExecutable(flow)).toBeTruthy();
      });
    });

    xdescribe('getFlowState', () => {
      xit('should return the appropriate flow state for the given flow', () => {
      });
    });
  });
});
