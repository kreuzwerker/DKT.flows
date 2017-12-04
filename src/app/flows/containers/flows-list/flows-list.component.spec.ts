/* tslint:disable: ter-max-len */
import { mockFlowsApp, mockFlowsState } from './../../utils/mocks';
import { MockRouter, MockMdDialog, mockSnackBar } from './../../../core/utils/mocks';
import { MdDialog } from '@angular/material';
import { TestUtils } from './../../utils/test.helpers';
import { FlowsListComponent } from './flows-list.component';
import { FlowsStateService } from './../../services';

describe('Flows App', () => {

  describe('FlowsList Component', () => {
    let component: FlowsListComponent;
    let utils: TestUtils;
    let flowsApp;
    let state: FlowsStateService;
    let router;
    let dialog;

    beforeEach(() => {
      utils = new TestUtils();
      flowsApp = mockFlowsApp;
      state = mockFlowsState;
      router = <any>new MockRouter();
      dialog = new MockMdDialog();
      component = new FlowsListComponent(flowsApp, state, router, dialog, mockSnackBar);
      expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
      it('should call loadFlows()', () => {
        let spy = spyOn(state, 'loadFlows');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('openDeleteFlowDialog()', () => {
      xit('should open the dialog to delete a flow.', () => {
        let spy = spyOn(component.dialog, 'open');
        // TODO finish MockDialogRef
        component.openDeleteFlowDialog('1', 'Flow name');
        expect(spy).toHaveBeenCalled();
      });

      xit('should delete the flow if the user confirms', () => {

      });

      xit('should show a message if the user confirms', () => {

      });
    });

    describe('showInfoMessage()', () => {
      it('should show a snack bar with the given message', () => {
        let spy = spyOn(component.snackBar, 'open');
        let message = 'test message';
        component.showInfoMessage(message);
        expect(spy).not.toHaveBeenCalledWith(message);
      });
    });
  });
});
