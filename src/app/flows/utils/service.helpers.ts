import { Service, ServiceStep } from './../models';

export function getServiceStepsByType(service: Service, type: string): ServiceStep[] {
  return service.steps.filter(step => step.type == type)
}

export function getServiceTriggerSteps(service: Service) {
  return getServiceStepsByType(service, 'trigger');
}

export function getServiceActionSteps(service: Service) {
  return getServiceStepsByType(service, 'action');
}