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
      expect(component.renderData).toBeNull();
      expect(component.renderType).toBe(StepTestResultType.TEXT);
    });
  });
});
