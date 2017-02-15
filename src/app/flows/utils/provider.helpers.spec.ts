/* tslint:disable: ter-max-len */
import { TestUtils } from './test.helpers';
import * as helpers from './provider.helpers';
import { Provider, ServiceType } from './../models';
import * as _ from 'lodash';

describe('Flows App', () => {

  describe('Provider Helpers', () => {
    let provider: Provider;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      provider = utils.createProviderData();
    });

    describe('getProviderServicesByType()', () => {
      it('should return services from the given provider filtered by the given type', () => {
        expect(_.some(provider.services, {type: ServiceType.TRIGGER})).toBeTruthy();
        expect(_.some(provider.services, {type: ServiceType.ACTION})).toBeTruthy();
        const services = helpers.getProviderServicesByType(provider, ServiceType.TRIGGER);
        expect(_.some(services, {type: ServiceType.TRIGGER})).toBeTruthy();
        expect(_.some(services, {type: ServiceType.ACTION})).toBeFalsy();
      });
    });

    describe('getProviderTriggerServices()', () => {
      it('should return trigger services from the given provider', () => {
        expect(_.some(provider.services, {type: ServiceType.TRIGGER})).toBeTruthy();
        expect(_.some(provider.services, {type: ServiceType.ACTION})).toBeTruthy();
        const services = helpers.getProviderTriggerServices(provider);
        expect(_.some(services, {type: ServiceType.TRIGGER})).toBeTruthy();
        expect(_.some(services, {type: ServiceType.ACTION})).toBeFalsy();
      });
    });

    describe('getProviderActionServices()', () => {
      it('should return action services from the given provider', () => {
        expect(_.some(provider.services, {type: ServiceType.TRIGGER})).toBeTruthy();
        expect(_.some(provider.services, {type: ServiceType.ACTION})).toBeTruthy();
        const services = helpers.getProviderActionServices(provider);
        expect(_.some(services, {type: ServiceType.TRIGGER})).toBeFalsy();
        expect(_.some(services, {type: ServiceType.ACTION})).toBeTruthy();
      });
    });
  });
});
