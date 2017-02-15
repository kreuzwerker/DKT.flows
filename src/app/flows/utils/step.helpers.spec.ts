/* tslint:disable: ter-max-len */
import { TestUtils } from './test.helpers';
import * as helpers from './step.helpers';
import { Step, ServiceType } from './../models';

describe('Flows App', () => {

  describe('Step Helpers', () => {
    let step: Step;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      step = utils.createStepData();
    });

    describe('stepHasService()', () => {
      it('should return true if given step has a service set', () => {
        expect(helpers.stepHasService(step)).toBeTruthy();
      });

      it('should return false if given step has no service set', () => {
        step.service = null;
        expect(helpers.stepHasService(step)).toBeFalsy();
      });
    });

    describe('stepIsConfigured()', () => {
      xit('should return true if given step is fully configured', () => {
        // TODO implement logic first
      });

      it('should return false if given step is not fully configured', () => {
        expect(helpers.stepIsConfigured(step)).toBeFalsy();
      });
    });

    describe('stepIsTested()', () => {
      xit('should return true if given step has been tested successfully', () => {
        // TODO implement logic first
      });

      it('should return false if given step has not been tested successfully', () => {
        expect(helpers.stepIsTested(step)).toBeFalsy();
      });
    });

    describe('getStepServiceType()', () => {
      it('should return Trigger type if the given step is the first flow step', () => {
        step.position = 0;
        expect(helpers.getStepServiceType(step)).toBe(ServiceType.TRIGGER);
      });

      it('should return Action type if the given step is not the first flow step', () => {
        step.position = 1;
        expect(helpers.getStepServiceType(step)).toBe(ServiceType.ACTION);
      });
    });

    describe('getStepServiceTypeName()', () => {
      it('should return Trigger string if the given step is the first flow step', () => {
        step.position = 0;
        expect(helpers.getStepServiceTypeName(step)).toBe('Trigger');
      });

      it('should return Action string if the given step is not the first flow step', () => {
        step.position = 1;
        expect(helpers.getStepServiceTypeName(step)).toBe('Action');
      });
    });
  });
});
