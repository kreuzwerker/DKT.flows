import { ServiceStep, ServiceStepType } from './../models';

export function getServiceStepTypeName(serviceStep: ServiceStep): string {
  return serviceStep.type == ServiceStepType.Trigger 
    ? 'trigger' 
    : 'action';
}