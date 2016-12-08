import { Provider, Service, ServiceType } from './../models';

export function getProviderStepsByType(provider: Provider, type: ServiceType): Service[] {
  return provider.steps ? provider.steps.filter(step => step.type == type) : [];
}

export function getProviderTriggerSteps(provider: Provider) {
  return getProviderStepsByType(provider, ServiceType.Trigger);
}

export function getProviderActionSteps(provider: Provider) {
  return getProviderStepsByType(provider, ServiceType.Action);
}