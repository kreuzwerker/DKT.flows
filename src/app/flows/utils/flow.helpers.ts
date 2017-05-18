import { Flow, FlowState, ServiceType, Step } from './../models';
import * as stepHelpers from './step.helpers';

export function getFlowTriggerStep(flow: Flow): Step {
  for (let step of flow.steps) {
    if (stepHelpers.getStepServiceType(step) === ServiceType.TRIGGER) {
      return step;
    }
  }

  return null;
}

// Gets the first action step
export function getFlowActionStep(flow: Flow): Step {
  for (let step of flow.steps) {
    if (stepHelpers.getStepServiceType(step) === ServiceType.ACTION) {
      return step;
    }
  }

  return null;
}

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
  }

  return true;
}

export function flowHasTriggerStep(flow: Flow): boolean {
  return getFlowTriggerStep(flow) !== null;
}

export function flowHasFinishedTriggerStep(flow: Flow): boolean {
  const step = getFlowTriggerStep(flow);
  return stepHelpers.stepIsExecutable(step);
}

export function flowHasActionStep(flow: Flow): boolean {
  return getFlowActionStep(flow) !== null;
}

export function flowIsActivated(flow: Flow): boolean {
  return true;
}

export function flowIsTriggered(flow: Flow): boolean {
  return false;
}

export function getFlowState(flow: Flow): FlowState {
  if (!flowIsExecutable(flow)) {
    if (!flowHasTriggerStep(flow)) {
      return FlowState.MISSING_TRIGGER;
    } else if (!flowHasFinishedTriggerStep(flow)) {
      return FlowState.UNFINISHED_TRIGGER;
    } else if (!flowHasActionStep(flow)) {
      return FlowState.MISSING_ACTION;
    } else {
      return FlowState.UNFINISHED_ACTION;
    }
  } else if (!flowIsActivated(flow)) {
    return FlowState.NOT_ACTIVATED;
  } else if (!flowIsTriggered(flow)) {
    return FlowState.NOT_TRIGGERED;
  } else {
    return FlowState.TRIGGERED;
  }
}
