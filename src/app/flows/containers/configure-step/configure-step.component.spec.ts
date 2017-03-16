/* tslint:disable: ter-max-len */
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { mockFlowsApp, mockFlowsState, mockStore } from './../../utils/mocks';
import { TestUtils } from './../../utils/test.helpers';
import { ConfigureStepComponent } from './configure-step.component';
import { FlowsAppService, FlowsStateService, FormBuilderService } from './../../services';
import { DynamicFormService, DynamicFormControlModel } from '@ng2-dynamic-forms/core';
import { ServiceConfigSchema } from './../../models';

describe('Flows App', () => {

  describe('ConfigureStep Component', () => {
    let component: ConfigureStepComponent;
    let utils: TestUtils;
    let flowsApp: FlowsAppService;
    let state: FlowsStateService;
    let store: any;

    const mockFormBuilder = {
      createFormModel(schema: ServiceConfigSchema[], values) {}
    } as FormBuilderService;

    const mockFormService = {
      createFormGroup(group: DynamicFormControlModel[], groupExtra: {[key: string]: any} | null = null) {
        return { } as any;
      }
    } as DynamicFormService;

    beforeEach(() => {
      utils = new TestUtils();
      flowsApp = mockFlowsApp;
      state = mockFlowsState;
      store = mockStore;

      component = new ConfigureStepComponent(flowsApp, state, mockFormBuilder, mockFormService);
      expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
      it('should set current step preparation stage to "configure"', () => {
        spyOn(flowsApp, 'setStepStage');
        component.ngOnInit();
        expect(flowsApp.setStepStage).toHaveBeenCalledWith('configure');
      });

      it('should call onSelectStep() when the current selected step changes', () => {
        spyOn(component, 'onSelectStep');
        component.ngOnInit();
        const step = utils.createStepData();
        store.step.next(step);
        expect(component.onSelectStep).toHaveBeenCalledWith(step);
      });
    });

    describe('onSelectStep()', () => {
      let step;

      beforeEach(() => {
        step = utils.createStepData();
      });

      it('should set the current step', () => {
        component.onSelectStep(step);
        expect(component.step).toEqual(step);
      });

      xit('should initialize the configure from with schema and values of the current step', () => {
        let spy = spyOn(component, 'initForm');
        component.onSelectStep(step);
        expect(spy).toHaveBeenCalledWith(step.service, step.configParams);
      });
    });

    describe('initForm()', () => {
      let step;

      beforeEach(() => {
        step = utils.createStepData();
      });

      it('should initialize the configuration form with the given schema and values', () => {
        component.initForm(step.service.configSchema, step.configParams);
        expect(component.formModel).not.toBeNull;
        expect(component.configForm).not.toBeNull;
      });
    });

    describe('saveForm()', () => {
      let step;

      beforeEach(() => {
        step = utils.createStepData();
        component.initForm(step.service.configSchema, step.configParams);
      });

      it('should save the configuration if the form is valid', () => {
        let spy1 = spyOn(state, 'dispatch');
        let spy2 = spyOn(flowsApp, 'saveFlowStep');
        component.configForm.value = step.configParams;
        component.configForm.valid = true;
        component.saveForm();
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
      });

      it('should not save the configuration if the form is invalid', () => {
        let spy1 = spyOn(state, 'dispatch');
        let spy2 = spyOn(flowsApp, 'saveFlowStep');
        component.configForm.valid = false;
        component.saveForm();
        expect(spy1).not.toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
      });
    });

    describe('reduceValues()', () => {
      xit('should reduce form values provided from API', () => {
      });
    });

    describe('mapValues()', () => {
      xit('should map form values in preparation for API', () => {
      });
    });

    describe('ngOnDestroy()', () => {
      xit('should unscribe all subscriptions', () => {
      });
    });
  });
});
