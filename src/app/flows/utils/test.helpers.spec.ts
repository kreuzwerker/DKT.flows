/* tslint:disable: ter-max-len */
import { TestUtils } from './test.helpers';
import { FlowData, StepData, Service, ServiceType, Provider, FlowRun } from '../models';

describe('Flows App', () => {

  describe('Test Helpers', () => {
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
    });

    it('should be initialized with default data', () => {
      expect(utils.defaultProviderData).not.toBeNull();
      expect(utils.defaultServiceData).not.toBeNull();
    });

    describe('createProviderData()', () => {
      it('should return a mocked provider data object', () => {
        const provider = utils.createProviderData();
        expect(provider.id).toBe('1');
        expect(provider.name).toBe('Test Provider');
        expect(provider.group).toBe('Test');
        expect(provider.description).toBe('Test Provider description');
        expect(provider.icon).toBe('check');
        expect(provider.services.length).toBe(4);
        expect(provider.services[0].type).toBe(ServiceType.TRIGGER);
        expect(provider.services[1].type).toBe(ServiceType.TRIGGER);
        expect(provider.services[2].type).toBe(ServiceType.ACTION);
        expect(provider.services[3].type).toBe(ServiceType.ACTION);
      });
    });

    describe('createProvidersListData()', () => {
      it('should return a list of mocked provider data objects', () => {
        const providers = utils.createProvidersListData();
        expect(providers.length).toBe(3);
      });
    });

    describe('createServiceData()', () => {
      it('should return a mocked service data object', () => {
        const service = utils.createServiceData();
        expect(service.id).toBe('1');
        expect(service.name).toBe('Test Service');
        expect(service.description).toBe('Test Service description');
        expect(service.type).toBe(ServiceType.TRIGGER);
        expect(service.provider).toEqual(utils.defaultProviderData);
      });
    });

    describe('createFlowData()', () => {
      it('should return a mocked flow data object', () => {
        const flow = utils.createFlowData();
        expect(flow.id).toBe('1');
        expect(flow.name).toBe('Test Flow');
        expect(flow.description).toBe('Test Flow description');
        expect(flow.steps.length).toBe(3);
      });
    });

    describe('createStepData()', () => {
      it('should return a mocked step data object', () => {
        const step = utils.createStepData();
        expect(step.id).toBe('1');
        expect(step.position).toBe(0);
        expect(step.service).toEqual(utils.defaultServiceData);
      });
    });

    describe('createFlowRunData()', () => {
      it('should return a mocked flow run object', () => {
        const flowRun = utils.createFlowRunData();
        expect(flowRun.id).toBe('1');
        expect(flowRun.status).toBe('running');
        expect(flowRun.message).toBe('flow run API message');
        expect(flowRun.currentStep).toBe(0);
        expect(flowRun.runsCount).toBe(0);
      });
    });
  });
});
