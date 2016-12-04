import { Step, ServiceStepType } from './../models';

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

export function getStepServiceStepType(step: Step): ServiceStepType {
  return step.position === 0 ? ServiceStepType.Trigger : ServiceStepType.Action;
}

export function getStepServiceStepTypeName(step: Step): string {
  return this.getStepServiceStepType(step) == ServiceStepType.Trigger 
    ? 'trigger' 
    : 'action';
}