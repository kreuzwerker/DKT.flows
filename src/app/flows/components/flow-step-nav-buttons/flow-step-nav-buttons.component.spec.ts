/* tslint:disable: ter-max-len */
import { FlowStepNavButtonsComponent } from './flow-step-nav-buttons.component';
import { MockRouter } from '../../../core/utils/mocks';
import { Subject } from 'rxjs/Subject';

describe('Flows App', () => {

  describe('FlowStepNavButtons Component', () => {
    let component;
    let router;

    beforeEach(() => {
      router = <any>new MockRouter();
      component = new FlowStepNavButtonsComponent(router);
      expect(component).toBeTruthy();
    });

    describe('back()', () => {
      it('should navigate to the current back path', () => {
        spyOn(component.router, 'navigate');
        component.backPath = 'backPath';
        component.back();
        expect(component.router.navigate).toHaveBeenCalledWith([component.backPath]);
        expect(component.router.navigate).not.toHaveBeenCalledWith([component.continuePath]);
      });
    });

    describe('continue()', () => {
      it('should call doContinue if callback result is true', () => {
        let spy = spyOn(component, 'doContinue');
        component.onContinue = () => true;
        component.continue();
        expect(spy).toHaveBeenCalled();
      });

      it('should not call doContinue if callback result is false', () => {
        let spy = spyOn(component, 'doContinue');
        component.onContinue = () => false;
        component.continue();
        expect(spy).not.toHaveBeenCalled();
      });

      it('should set continueIsLoading to true if callback result is an observable', () => {
        component.onContinue = () => new Subject<boolean>();
        component.continue();
        expect(component.continueIsLoading).toBeTruthy();
      });

      xit('should set continueIsLoading to false and call doContinue() when the callback observable returns a result', () => {
        component.onContinue = () => new Subject<boolean>();
        // TODO handle observable response
        component.continue();
        expect(component.continueIsLoading).toBeFalsy();
      });

      it('should call doContinue() directly if no onContinue callback is set', () => {
        let spy = spyOn(component, 'doContinue');
        component.onContinue = null;
        component.continue();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('doContinue()', () => {
      xit('should navigate to the current continue path after 1ms', () => {
        let spy = spyOn(component.router, 'navigate');
        component.continuePath = 'continuePath';
        component.doContinue();
        // TODO handle timeout event
        expect(spy).toHaveBeenCalledWith([component.continuePath]);
        expect(spy).not.toHaveBeenCalledWith([component.backPath]);
      });
    });
  });
});
