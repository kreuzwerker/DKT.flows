import { Provider, Service, ServiceType } from './../models';

export function getProviderStepsByType(provider: Provider, type: ServiceType): Service[] {
  return provider.services ? provider.services.filter(service => service.type === type) : [];
}

export function getProviderTriggerSteps(provider: Provider) {
  return getProviderStepsByType(provider, ServiceType.TRIGGER);
}

export function getProviderActionSteps(provider: Provider) {
  return getProviderStepsByType(provider, ServiceType.ACTION);
}
