import { FlowsAppService } from './../../services';
import { Step } from './../../models';

export const mockFlowsApp = {
  saveFlow(): void { },
  saveFlowStep(): void { },
  setStepStage(stage: string): void { },
  setStep(step: Step): void {},
  showStatusMessage(message: string, type: string): void {},
  hideStatusMessage(): void {},
  createAndStartFlowRun(payload: any): void {},
} as FlowsAppService;

