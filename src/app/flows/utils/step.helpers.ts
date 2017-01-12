import { Step, ServiceType } from './../models';

export function stepHasService(step: Step): boolean {
  return typeof step !== undefined && typeof step.service === 'object';
}

export function stepIsConfigured(step: Step): boolean {
  // TODO determine if step has been fully configured
  return false;
}

export function stepIsTested(step: Step): boolean {
  // TODO determine if step has been tested successfully
  return false;
}

export function getStepServiceType(step: Step): ServiceType {
  return step.position === 0 ? ServiceType.Trigger : ServiceType.Action;
}

export function getStepServiceTypeName(step: Step): string {
  return getStepServiceType(step) === ServiceType.Trigger
    ? 'Trigger'
    : 'Action';
}
