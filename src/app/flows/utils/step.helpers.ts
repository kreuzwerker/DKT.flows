import { Step, ServiceType } from './../models';

export function stepHasService(step: Step): boolean {
  return typeof step !== undefined
    && step.service != null
    && typeof step.service === 'object';
}

export function stepIsConfigured(step: Step): boolean {
  return step.configParams !== undefined
    && step.configParams != null
    && typeof step.configParams === 'object';
}

export function stepIsTested(step: Step): boolean {
  return step.tested === true;
}

export function stepIsExecutable(step: Step): boolean {
  return stepHasService(step) && stepIsConfigured(step) && stepIsTested(step);
}

export function getStepServiceType(step: Step): ServiceType {
  return step.position === 0 ? ServiceType.TRIGGER : ServiceType.ACTION;
}

export function getStepServiceTypeName(step: Step): string {
  return getStepServiceType(step) === ServiceType.TRIGGER
    ? 'Trigger'
    : 'Action';
}
