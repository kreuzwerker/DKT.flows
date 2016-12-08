import { Provider, ServiceStep, ServiceStepType } from './../models';

export function getProviderStepsByType(provider: Provider, type: ServiceStepType): ServiceStep[] {
  return provider.steps ? provider.steps.filter(step => step.type == type) : [];
}

export function getProviderTriggerSteps(provider: Provider) {
  return getProviderStepsByType(provider, ServiceStepType.Trigger);
}

export function getProviderActionSteps(provider: Provider) {
  return getProviderStepsByType(provider, ServiceStepType.Action);
}