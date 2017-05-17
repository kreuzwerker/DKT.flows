/* tslint:disable: ter-max-len */
import { SimpleChange } from '@angular/core';
import { StepTestResultType } from './../../models';
import { TestUtils } from './../../utils/test.helpers';
import { StepTestResultComponent } from './step-test-result.component';

describe('Flows App', () => {
  describe('StepTestResult Component', () => {
    let component: StepTestResultComponent;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      component = new StepTestResultComponent();
      expect(component).toBeTruthy();
    });

    it('should correctly initialize properties', () => {
      expect(component.type).toBeNull();
      expect(component.data).toBeNull();
      expect(component.show).toBeFalsy();
    });

    describe('ngOnChanges()', () => {
      it('should call updateTestResults() when properties change', () => {
        spyOn(component, 'updateTestResults');
        component.type = StepTestResultType.HTML;
        component.ngOnChanges({ type: new SimpleChange(null, component.type, true)});
        expect(component.updateTestResults).toHaveBeenCalled();
      });

      it('should not call updateTestResults() when type is ERROR', () => {
        spyOn(component, 'updateTestResults');
        component.type = StepTestResultType.ERROR;
        component.ngOnChanges({ type: new SimpleChange(null, component.type, true)});
        expect(component.updateTestResults).not.toHaveBeenCalled();
      });
    });

    describe('updateTestResults()', () => {
      it('should call setFrameContents', () => {
        spyOn(component, 'setFrameContents');
        component.type = StepTestResultType.HTML;
        component.data = '<p>HTML</p>';
        component.updateTestResults();
        expect(component.setFrameContents).toHaveBeenCalledWith(component.data);
      });
    });

    describe('setFrameContents()', () => {
      xit('should write the given HTML into the iframe document window', () => {
      });
    });
  });
});
