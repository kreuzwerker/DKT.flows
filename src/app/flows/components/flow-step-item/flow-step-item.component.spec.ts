/* tslint:disable: ter-max-len */
import { SimpleChange } from '@angular/core';
import { TestUtils } from './../../utils/test.helpers';
import { FlowStepItemComponent } from './flow-step-item.component';
import { FlowsAppService } from './../../services';
import { Flow, Step } from '../../models';
import * as stepHelpers from './../../utils/step.helpers';

describe('Flows App', () => {

  describe('FlowStepItem Component', () => {
    let component: FlowStepItemComponent;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      component = new FlowStepItemComponent({} as FlowsAppService);
      expect(component).toBeTruthy();
    });

    // UI
    // - should list the available options for the given step
    //   => test option states: active, locked
    // - I can select a service step

    describe('ngOnInit()', () => {
      it('should call render()', () => {
        spyOn(component, 'render');
        component.ngOnInit();
        expect(component.render).toHaveBeenCalled();
      });
    });

    describe('ngOnChanges()', () => {
      it('should call render() on changes', () => {
        spyOn(component, 'render');
        const step = utils.createStepData();
        component.ngOnChanges({ step: new SimpleChange(null, step, true)});
        expect(component.render).toHaveBeenCalled();
        const active = 'select';
        component.ngOnChanges({ currentActive: new SimpleChange(null, null, false)});
        expect(component.render).toHaveBeenCalled();
      });
    });

    describe('render()', () => {
      beforeEach(() => {
        component.flow = utils.createFlowData();
        component.step = utils.createStepData();
        component.currentActive = 'select';
      });

      it('should set the options correctly for the current step', () => {
        expect(component.options).toEqual([]);
        component.render();
        expect(component.options).not.toEqual([]);
      });

      it('should set the header icon and title to step service and provider if the current step has a service set', () => {
        const service = component.step.service;
        const provider = service.provider;
        component.render();
        expect(component.headerIcon).toBe(provider.icon);
        const title = `${provider.name}: ${service.name}`;
        expect(component.headerTitle).toBe(title);
        expect(component.highlight).toBeFalsy();
      });

      it('should set the header icon and title correctly if the current step has no service set', () => {
        component.step.service = undefined;
        component.render();
        expect(component.headerIcon).toBe('settings');
        expect(component.headerTitle).toBe('Set up this step');
        expect(component.highlight).toBeTruthy();
      });
    });

    describe('getStepOptions()', () => {
      xit('should return the correct step options for the given step', () => {
      });
    });

  });
});
