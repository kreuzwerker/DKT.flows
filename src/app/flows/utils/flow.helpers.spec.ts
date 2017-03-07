/* tslint:disable: ter-max-len */
import { TestUtils } from './test.helpers';
import * as helpers from './flow.helpers';
import { Flow } from './../models';

describe('Flows App', () => {

  describe('Flow Helpers', () => {
    let flow: Flow;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      flow = utils.createFlowData();
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
  });
});
