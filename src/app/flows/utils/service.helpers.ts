import {
  Service,
  ServiceType,
  StepTestResultType,
  ServiceIOType
} from './../models';

export function getServiceTypeName(service: Service): string {
  return service.type === ServiceType.TRIGGER
    ? 'Trigger'
    : 'Action';
}

export function getServiceResultType(service: Service): StepTestResultType {
  switch (<ServiceIOType>service.outputType) {
    case ServiceIOType.ANNOTATIONS:
      return StepTestResultType.ANNOTATIONS;

    case ServiceIOType.JSON:
      return StepTestResultType.JSON;

    case ServiceIOType.HTML:
      return StepTestResultType.HTML;

    default:
      return StepTestResultType.TEXT;
  }
}
