import { Provider, Service, ServiceType } from './../models';

export function getProviderServicesByType(provider: Provider, type: ServiceType): Service[] {
  return provider.services ? provider.services.filter(service => service.type === type) : [];
}

export function getProviderTriggerServices(provider: Provider) {
  return getProviderServicesByType(provider, ServiceType.TRIGGER);
}

export function getProviderActionServices(provider: Provider) {
  return getProviderServicesByType(provider, ServiceType.ACTION);
}
