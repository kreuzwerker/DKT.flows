import { FlowsAppService } from './../../services';
import { Step } from './../../models';

export const mockFlowsApp = {
  setStepStage(stage: string): void { },
  setStep(step: Step): void {}
} as FlowsAppService;

