import { Flow } from './../models';
import * as stepHelpers from './step.helpers';

export function flowIsExecutable(flow: Flow): boolean {
  // A flow requires at least two steps
  if (flow.steps.length <= 1) {
    return false;
  }

  // All steps need to be executable
  for (let step of flow.steps) {
    if  (stepHelpers.stepIsExecutable(step) === false) {
      return false;
    }
  };

  return true;
}
