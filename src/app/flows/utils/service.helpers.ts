import { Service, ServiceStep, ServiceStepType } from './../models';

export function getServiceStepsByType(service: Service, type: ServiceStepType): ServiceStep[] {
  return service.steps ? service.steps.filter(step => step.type == type) : [];
}

export function getServiceTriggerSteps(service: Service) {
  return getServiceStepsByType(service, ServiceStepType.Trigger);
}

export function getServiceActionSteps(service: Service) {
  return getServiceStepsByType(service, ServiceStepType.Action);
}