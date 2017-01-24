import { FlowsAppActions } from './flows-app.actions';
import { FlowData } from '../models';
import { flowsAppReducer } from './flows-app.reducer';
import { testUtils } from '../utils/test.helpers';

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
