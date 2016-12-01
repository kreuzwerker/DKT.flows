import { Step } from './../models';

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