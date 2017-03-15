/* tslint:disable: ter-max-len */
import { TestUtils } from './../utils/test.helpers';
import { Service } from './../models';
import { FormBuilderService } from './../services';
import {
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicTextAreaModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
} from '@ng2-dynamic-forms/core';

describe('Flows App', () => {

  describe('FormBuilder Service', () => {
    let service: FormBuilderService;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      service = new FormBuilderService();
      expect(service).toBeTruthy();
    });

    describe('createFormModel()', () => {
      it('should create a formModel array from the given service and form values', () => {
        const _service = utils.createServiceData();
        const values = utils.defaultStepConfigParams;
        let formModel = service.createFormModel(_service.configSchema, values);
        expect(formModel[0]).toBeAnInstanceOf(DynamicInputModel);
        // TODO check element value
      });
    });

    describe('createInputModel()', () => {
      xit('should create an input model', () => {
        let element = {};
        let value = {};
        let model = service.createInputModel(element, value);
        expect(model).toBeAnInstanceOf(DynamicInputModel);
        // TODO check element value
      });
    });

    xdescribe('createTextareaModel()', () => {
      xit('should create a textarea model', () => {
      });
    });

    xdescribe('createCheckboxModel()', () => {
      xit('should create a checkbox model', () => {
      });
    });

    xdescribe('createSelectModel()', () => {
      xit('should create a select model', () => {
      });
    });

    xdescribe('createRadioModel()', () => {
      xit('should create a radio model', () => {
      });
    });

    describe('ngOnDestroy()', () => {
      xit('should unscribe all subscriptions', () => {
      });
    });
  });
});
