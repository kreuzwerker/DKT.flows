/* tslint:disable: ter-max-len */
import { FlowData, StepData, Service, ServiceType, Provider } from '../models';

export class TestUtils {
  defaultProviderData: Provider;
  defaultServiceData: Service;

  constructor() {
    this.defaultProviderData = this.createProviderData();
    this.defaultServiceData = this.createServiceData();
  }

  createProviderData(
    id: string = '1',
    name: string = 'Test Provider',
    group: string = 'Test',
    description: string = 'Test Provider description',
    icon: string = 'check',
  ): Provider {
    let services: Service[] = [
      this.createServiceData('1', 'Trigger service A', 'Trigger service A description', ServiceType.TRIGGER),
      this.createServiceData('2', 'Trigger service B', 'Trigger service B description', ServiceType.TRIGGER),
      this.createServiceData('3', 'Action service A', 'Action service A description', ServiceType.ACTION),
      this.createServiceData('4', 'Action service B', 'Action service B description', ServiceType.ACTION),
    ];

    return {
      id: id,
      name: name,
      group: group,
      description: description,
      icon: icon,
      services: services,
    };
  };

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

  createFlowData(id: string = '1'): FlowData {
    let steps: StepData[] = [
      this.createStepData('1', 0),
      this.createStepData('2', 1),
      this.createStepData('3', 2),
    ];

    return {
      id: id,
      name: 'First flow',
      description: 'This is a mocked flow object.',
      steps: steps,
    };
  }

  createStepData(
    id: string = '1',
    position: number = 0,
    service: Service = this.defaultServiceData
  ): StepData {
    return   {
      id: id,
      position: position,
      service: service,
    };
  }
};
