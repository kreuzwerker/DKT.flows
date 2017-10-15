/* tslint:disable: ter-max-len */
import { FlowData, StepData, StepTest, StepConfigParamsInput, FlowRun, Service, ServiceConfigSchema, ServiceType, Provider } from '../models';

export class TestUtils {
  defaultProviderData: Provider = null;
  defaultServiceData: Service = null;
  defaultServiceConfigSchema: ServiceConfigSchema[] = [
    {
      position: 0,
      fieldId: 'field',
      type: 'input',
      defaultValue: 'field_value',
      label: 'input field',
      required: true,
    }
  ];
  defaultStepConfigParamsInputs: StepConfigParamsInput[] = [
    {
      fieldId: 'field',
      value: 'field_value',
    }
  ];

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
  }

  createProvidersListData(): Provider[] {
    return [
      this.createProviderData('1', 'Test Provider 1'),
      this.createProviderData('2', 'Test Provider 2'),
      this.createProviderData('3', 'Test Provider 3'),
    ];
  }

  createServiceData(
    id: string = '1',
    name: string = 'Test Service',
    description: string = 'Test Service description',
    type: ServiceType = ServiceType.TRIGGER,
    provider: Provider = this.defaultProviderData,
    configSchema: ServiceConfigSchema[] = this.defaultServiceConfigSchema,
  ): Service {
    return {
      id: id,
      name: name,
      description: description,
      type: type,
      provider: provider,
      configSchema: configSchema,
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
      name: 'Test Flow',
      description: 'Test Flow description',
      steps: steps,
      flowRun: this.createFlowRunData()
    };
  }

  createStepData(
    id: string = '1',
    position: number = 0,
    service: Service = this.defaultServiceData,
    configParams: StepConfigParamsInput[] = this.defaultStepConfigParamsInputs,
    tested: boolean = true
  ): StepData {
    return   {
      id: id,
      position: position,
      service: service,
      configParams: configParams,
      tested: tested,
    };
  }

  createFlowRunData(id: string = '1', status: string = 'running'): FlowRun {
    return {
      id: '1',
      status: status,
      message: 'flow run API message',
      currentStep: 0,
      runsCount: 0,
    };
  }

  createStepTestData(id: string = '1', error: any = null, tested: boolean = true): StepTest {
    return {
      id: id,
      description: '',
      service: this.defaultServiceData,
      result: '',
      error: error,
      tested: tested,
    };
  }
}
