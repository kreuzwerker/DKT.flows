import { FlowData, StepData, Service, ServiceType, Provider } from '../models';

export class TestUtils {
  createProviderData(
    id: string = '1',
    name: string = 'Test Provider',
    group: string = 'Test',
    description: string = 'Test Provider description',
    icon: string = 'check',
  ): Provider {
    return {
      id: id,
      name: name,
      group: group,
      description: description,
      icon: icon,
    };
  };

  defaultProviderData = this.createProviderData();

  createServiceData(
    id: string = '1',
    name: string = 'Test Service',
    description: string = 'Test Service description',
    type: ServiceType = ServiceType.TRIGGER,
    provider: Provider = this.defaultProviderData
  ): Service {
    return {
      id: id,
      name: name,
      description: description,
      type: type,
      provider: provider
    };
  }

  defaultServiceData = this.createServiceData();

  createFlowData(id: string = '1'): FlowData {
    return {
      id: id,
      name: 'First flow',
      description: 'This is a mocked flow object.'
    };
  }

  createStepData(
    id: string = '1',
    position: number = 0,
    service: Service = this.defaultServiceData
  ): StepData {
    return   {
      id: '1',
      position: position,
      service: service,
    };
  }
};

export class MockChangeDetectorRef {
   markForCheck() { };
   detach() {};
   detectChanges() {};
   checkNoChanges() {};
   reattach() {};
}
