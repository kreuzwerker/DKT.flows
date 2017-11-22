/* tslint:disable: ter-max-len */
import { TestUtils } from './test.helpers';
import * as helpers from './service.helpers';
import { Service, ServiceType, ServiceIOType, StepTestResultType } from './../models';

describe('Flows App', () => {

  describe('Provider Service Helpers', () => {
    let service: Service;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      service = utils.createServiceData();
    });

    describe('getServiceTypeName()', () => {
      it('should return the correct service type for the given service', () => {
        service.type = ServiceType.TRIGGER;
        expect(helpers.getServiceTypeName(service)).toBe('Trigger');
        service.type = ServiceType.ACTION;
        expect(helpers.getServiceTypeName(service)).toBe('Action');
      });
    });

    describe('getServiceResultType()', () => {
      it('should return the correct service result type based on the serive\'s output type', () => {
        service.outputType = ServiceIOType.ANNOTATIONS;
        expect(helpers.getServiceResultType(service)).toBe(StepTestResultType.ANNOTATIONS);
        service.outputType = ServiceIOType.JSON;
        expect(helpers.getServiceResultType(service)).toBe(StepTestResultType.JSON);
        service.outputType = ServiceIOType.HTML;
        expect(helpers.getServiceResultType(service)).toBe(StepTestResultType.HTML);
        service.outputType = ServiceIOType.URL;
        expect(helpers.getServiceResultType(service)).toBe(StepTestResultType.TEXT);
        service.outputType = ServiceIOType.STRING;
        expect(helpers.getServiceResultType(service)).toBe(StepTestResultType.TEXT);
        service.outputType = ServiceIOType.NUMBER;
        expect(helpers.getServiceResultType(service)).toBe(StepTestResultType.TEXT);
      });
    });
  });
});
