/* tslint:disable: ter-max-len */
import { MockRouter } from './../../core/utils/mocks';
import { mockFlowsState } from './../utils/mocks';
import { TestUtils } from './../utils/test.helpers';
import { FlowsAppService, FlowsStateService } from './../services';

describe('Flows App', () => {

  describe('FlowsApp Service', () => {
    let service: FlowsAppService;
    let utils: TestUtils;
    let state: FlowsStateService;
    let router;

    beforeEach(() => {
      utils = new TestUtils();
      state = mockFlowsState;
      router = <any>new MockRouter();
      service = new FlowsAppService(state, router);
      expect(service).toBeTruthy();
      service.flow = utils.createFlowData();
      service.step = utils.createStepData();
    });

    xit('should be initialized with correct properties', () => {
    });

    describe('setStep()', () => {
      xit('should set the current step to the given step', () => {
      });

      xit('should set the current stepTypeName from the given step', () => {
      });
    });

    describe('setStepStage()', () => {
      it('should set the current step preparation stage to the given value', () => {
        expect(service.stepStage).toBeNull();
        let stage = 'select';
        service.setStepStage(stage);
        expect(service.stepStage).toBe(stage);
      });
    });

    describe('saveFlow()', () => {
      xit('should save the current flow', () => {
      });
    });

    describe('saveFlowStep()', () => {
      xit('should save the current flow step', () => {
      });
    });

    describe('addFlowStep()', () => {
      xit('should create a new flow step and add it at the end.', () => {
      });
    });

    describe('removeFlowStep()', () => {
      xit('should delete a flow step and remove it from the flow steps.', () => {
      });

      xit('should not remove a flow step if the given step is a trigger step.', () => {
      });
    });

    describe('createFlowRun()', () => {
      it('should create a new flow run for the current selected flow and with the current user.', () => {
        let spy = spyOn(state, 'createFlowRun');
        service.createFlowRun();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('startFlowRun()', () => {
      it('should start a new flow run of the current selected flow and with the given payload.', () => {
        let spy = spyOn(state, 'startFlowRun');
        service.startFlowRun({});
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('showStatusMessage()', () => {
      it('should show a status message with the given message and type.', () => {
        const msg = 'status message';
        const error = 'error';
        service.showStatusMessage(msg, error);
        expect(service.statusMessageText).toBe(msg);
        expect(service.statusMessageType).toBe(error);
        expect(service.statusMessageShow).toBeTruthy();
      });
    });

    describe('hideStatusMessage()', () => {
      it('should hide the current status message.', () => {
        service.hideStatusMessage();
        expect(service.statusMessageShow).toBeFalsy();
      });
    });

    xdescribe('showAllFlows()', () => {
      xit('should redirect to the flows overview', () => {
      });
    });

    xdescribe('selectStep()', () => {
      xit('should redirect to the given flow step\'s select service view', () => {
      });
    });

    describe('flowPath()', () => {
      it('should return the correct path for the given flow', () => {
        const path = `/flows/${service.flow.id}`;
        expect(service.flowPath()).toBe(path);
      });

      it('should return an empty path if no flow is selected', () => {
        service.flow = null;
        expect(service.flowPath()).toEqual('');
      });
    });

    describe('flowStepPath()', () => {
      it('should return the correct path for the given step', () => {
        const path = `${service.flowPath()}/steps/${service.step.id}`;
        expect(service.flowStepPath()).toBe(path);
      });

      it('should return an empty path if no step is selected', () => {
        service.step = null;
        expect(service.flowStepPath()).toEqual('');
      });
    });

    describe('createStepObject()', () => {
      it('should return a new flow step object for the given parameters.', () => {
        const testService = utils.createServiceData();
        const step = {
          id: 'new',
          position: 0,
          service: testService
        };
        const res = service.createStepObject(0, testService);
        expect(res).toEqual(step);
      });
    });
  });
});
