import { FlowActions } from '../actions';
import { flowReducer } from './flow.reducer';
import { testUtils } from '../utils/test.helpers';

describe('flow', () => {
  describe('flowReducer', () => {
    let flowActions: FlowActions;

    beforeEach(() => {
      flowActions = new FlowActions();
    });

    describe('FETCH_FLOW_SUCCESS action', () => {
      it('should add flow to the store', () => {
        let flowData = testUtils.createFlowData();
        let flow = flowReducer(undefined, flowActions.fetchFlowFulfilled(flowData));
        // expect(flow.has(flow.id)).toBe(true);
        expect(flow.flow.id).toEqual('1');
      });
    });
  });
});
