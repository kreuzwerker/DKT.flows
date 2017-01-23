import { Service, ServiceType } from './../models';

export function getServiceTypeName(service: Service): string {
  return service.type === ServiceType.TRIGGER
    ? 'Trigger'
    : 'Action';
}
