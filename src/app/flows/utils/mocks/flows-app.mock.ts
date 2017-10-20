import { FlowsAppService } from './../../services';
import { Flow, Step } from './../../models';

export const mockFlowsApp = {
  saveFlow(): void { },
  deleteFlow(): void { },
  saveFlowStep(): void { },
  setStepStage(stage: string): void { },
  setFlow(flow: Flow): void {},
  setStep(step: Step): void {},
  showStatusMessage(message: string, type: string): void {},
  hideStatusMessage(): void {},
  restoreFlow(): void { },
  createFlowRun(): void {},
  startFlowRun(payload: any): void {},
  createFlowObject(flowData: Object): Flow {},
  createStepObject(stepData: Object): Step {},
} as FlowsAppService;

