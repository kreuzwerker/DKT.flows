/* tslint:disable: ter-max-len */
import { TestUtils } from './test.helpers';
import * as helpers from './service.helpers';
import { Service, ServiceType } from './../models';

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
  });
});
