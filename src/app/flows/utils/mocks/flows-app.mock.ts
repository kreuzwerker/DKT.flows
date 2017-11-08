import { FlowsAppService } from './../../services';
import { Flow, Step } from './../../models';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export const mockFlowsApp = {
  saveFlow(): void { },
  deleteFlow(): Observable<any> {
    return new Subject<any>();
  },
  saveFlowStep(): Observable<any> {
    return new Subject<any>();
  },
  addFlowStep(): void {},
  removeFlowStep(step: Step): void {},
  resetFlowStepConfig(): void {},
  setStepStage(stage: string): void { },
  setFlow(flow: Flow): void {},
  setStep(step: Step): void {},
  showStatusMessage(message: string, type: string): void {},
  hideStatusMessage(): void {},
  restoreFlow(): void { },
  createFlowRun(): void {},
  startFlowRun(payload: any): void {},
  createFlowObject(flowData: Object): void {},
  createStepObject(stepData: Object): void {},
} as FlowsAppService;

