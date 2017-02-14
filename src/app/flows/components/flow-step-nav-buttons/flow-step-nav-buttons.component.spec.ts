/* tslint:disable: ter-max-len */
import { FlowStepNavButtonsComponent } from './flow-step-nav-buttons.component';
import { MockRouter } from '../../utils/mocks';

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
      it('should navigate to the current contibure path', () => {
        spyOn(component.router, 'navigate');
        component.continuePath = 'continuePath';
        component.continue();
        expect(component.router.navigate).toHaveBeenCalledWith([component.continuePath]);
        expect(component.router.navigate).not.toHaveBeenCalledWith([component.backPath]);
      });
    });
  });
});
