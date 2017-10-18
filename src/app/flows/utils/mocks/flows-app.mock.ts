import { FlowsAppService } from './../../services';
import { Step } from './../../models';

export const mockFlowsApp = {
  saveFlow(): void { },
  deleteFlow(): void { },
  saveFlowStep(): void { },
  setStepStage(stage: string): void { },
  setStep(step: Step): void {},
  showStatusMessage(message: string, type: string): void {},
  hideStatusMessage(): void {},
  restoreFlow(): void { },
  createFlowRun(): void {},
  startFlowRun(payload: any): void {},
} as FlowsAppService;

