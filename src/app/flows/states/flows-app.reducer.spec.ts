/* tslint:disable: max-line-length */
import { TestBed } from '@angular/core/testing';
import { TestUtils } from '../utils/test.helpers';
import { FlowsAppActions } from './flows-app.actions';
import { flowsAppReducer } from './flows-app.reducer';

describe('Flows App', () => {

  describe('Flows App Reducer', () => {
    let state;
    let actions;
    let utils;

    beforeEach(() => {
      actions = new FlowsAppActions();
      utils = new TestUtils();
    });

    describe('SELECT_FLOW action', () => {
      it('should set flowId to the given value', () => {
        let flowId = '1';
        state = flowsAppReducer(undefined, actions.selectFlow(flowId));
        expect(state.flowId).toEqual(flowId);
      });
    });

    describe('SELECT_STEP action', () => {
      it('should set step to the given value', () => {
        let step = utils.createStepData();
        state = flowsAppReducer(undefined, actions.selectStep(step));
        expect(state.step).toEqual(step);
      });
    });

    describe('SET_STEP_SERVICE_STEP action', () => {
      it('should set step.provider and step.service to the given values', () => {
        let provider = utils.createProviderData();
        let service = utils.createServiceData();
        state = flowsAppReducer(undefined, actions.setStepService(provider, service));
        expect(state.step.provider).toEqual(provider);
        expect(state.step.service).toEqual(service);
      });
    });

    describe('SELECT_PROVIDER action', () => {
      it('should set provider to the given value', () => {
        let provider = utils.createProviderData();
        state = flowsAppReducer(undefined, actions.selectProvider(provider));
        expect(state.provider).toEqual(provider);
      });
    });

    describe('SET_LOADING_FLOW action', () => {
      it('should set the loading flow flag to the given value', () => {
        state = flowsAppReducer(undefined, actions.setLoadingFlow(true));
        expect(state.loadingFlow).toBeTruthy();
        state = flowsAppReducer(undefined, actions.setLoadingFlow(false));
        expect(state.loadingFlow).toBeFalsy();
      });
    });

    describe('SET_LOADING_FLOWS action', () => {
      it('should set the loading flows flag to the given value', () => {
        state = flowsAppReducer(undefined, actions.setLoadingFlows(true));
        expect(state.loadingFlows).toBeTruthy();
        state = flowsAppReducer(undefined, actions.setLoadingFlows(false));
        expect(state.loadingFlows).toBeFalsy();
      });
    });

    describe('SET_LOADING_PROVIDERS action', () => {
      it('should set the loading providers flag to the given value', () => {
        state = flowsAppReducer(undefined, actions.setLoadingProviders(true));
        expect(state.loadingProviders).toBeTruthy();
        state = flowsAppReducer(undefined, actions.setLoadingProviders(false));
        expect(state.loadingProviders).toBeFalsy();
      });
    });

    describe('SET_SAVING_FLOW action', () => {
      it('should set the saving flow flag and saved status to the given values', () => {
        state = flowsAppReducer(undefined, actions.setSavingFlow(true, true));
        expect(state.savingFlow).toBeTruthy();
        expect(state.savedFlow).toBeTruthy();
        state = flowsAppReducer(undefined, actions.setSavingFlow(false, false));
        expect(state.savingFlow).toBeFalsy();
        expect(state.savedFlow).toBeFalsy();
      });
    });
  });
});


// import { FlowsAppActions } from './flows-app.actions';
// import { FlowData } from '../models';
// import { flowsAppReducer } from './flows-app.reducer';
// import { testUtils } from '../utils/test.helpers';

// describe('Flow reducers', () => {
//   describe('Load flow', () => {
//     let flowActions: FlowsAppActions;
//     let flow;

//     beforeEach(() => {
//       flowActions = new FlowsAppActions();
//     });

//     describe('LOAD_FLOW action', () => {
//       beforeEach(() => {
//         flow = flowsAppReducer(undefined, flowActions.loadFlow('1'));
//       });

//       xit('should fetch the flow from API', () => {
//         // spy on this.api.fetchFlow
//       });

//       it('should set the loading flag', () => {
//         expect(flow.loading).toBeTruthy();
//         expect(flow.loaded).toBeFalsy();
//       });
//     });

//     describe('FETCH_FLOW_SUCCESS action', () => {
//       let flowData: FlowData;

//       beforeEach(() => {
//         flowData = testUtils.createFlowData();
//         flow = flowsAppReducer(undefined, flowActions.fetchFlowFulfilled(flowData));
//       });

//       it('should update flow.flow', () => {
//         expect(flow.flow.id).not.toEqual('0');
//         expect(flow.flow.id).toEqual('1');
//       });

//       it('should unset the loading flag', () => {
//         expect(flow.loading).toBeFalsy();
//         expect(flow.loaded).toBeTruthy();
//       });
//     });


//     describe('FETCH_FLOW_FAILED action', () => {
//       beforeEach(() => {
//         flow = flowsAppReducer(undefined, flowActions.fetchFlowFailed({}));
//       });

//       it('should NOT update flow.flow', () => {
//         expect(flow.flow.id).toEqual('0');
//       });

//       it('should unset the loading flag', () => {
//         expect(flow.loading).toBeFalsy();
//         expect(flow.loaded).toBeFalsy();
//       });
//     });
//   });

//   describe('Save flow', () => {
//     let flowActions: FlowsAppActions;
//     let flowData: FlowData;
//     let flow;

//     beforeEach(() => {
//       flowActions = new FlowsAppActions();
//       flowData = testUtils.createFlowData();
//       // Load initial flow store state
//       flow = flowsAppReducer(undefined, flowActions.fetchFlowFulfilled(flowData));
//     });

//     describe('SAVE_FLOW action', () => {
//       beforeEach(() => {
//         flowData.description = flowData.description + ' UPDATED';
//         flow = flowsAppReducer(flow, flowActions.saveFlow('1', flowData));
//       });

//       xit('should update the flow', () => {
//         // spy on this.api.updateFlow
//       });

//       it('should set the saving flag', () => {
//         expect(flow.saving).toBeTruthy();
//         expect(flow.saved).toBeFalsy();
//       });
//     });

//     describe('UPDATE_FLOW_SUCCESS action', () => {
//       beforeEach(() => {
//         flowData = testUtils.createFlowData();
//         flowData.description = flowData.description + ' UPDATED';
//         flow = flowsAppReducer(flow, flowActions.updateFlowFulfilled(flowData));
//       });

//       it('should update flow.flow', () => {
//         expect(flow.flow.description).toContain('UPDATED');
//       });

//       it('should unset the saving flag', () => {
//         expect(flow.saving).toBeFalsy();
//         expect(flow.saved).toBeTruthy();
//       });
//     });


//     describe('UPDATE_FLOW_FAILED action', () => {
//       let origDescription;
//       beforeEach(() => {
//         origDescription = flowData.description;
//         flow = flowsAppReducer(flow, flowActions.updateFlowFailed({}));
//       });

//       it('should NOT update flow.flow', () => {
//         expect(flow.flow.description).toEqual(origDescription);
//       });

//       it('should unset the loading flag', () => {
//         expect(flow.saving).toBeFalsy();
//         expect(flow.saved).toBeFalsy();
//       });
//     });
//   });
// });
