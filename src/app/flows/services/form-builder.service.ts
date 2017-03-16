import { Injectable } from '@angular/core';
import { ServiceConfigSchema } from './../models';
import * as _ from 'lodash';
import {
    DynamicFormControlModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicTextAreaModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
} from '@ng2-dynamic-forms/core';

const FORM_ELM_DEFAULT_CLASSES = {
  element: {
    container: 'control full-width'
  }
};

@Injectable()
export class FormBuilderService {

  constructor() { }

  createFormModel(schema: ServiceConfigSchema[], values): DynamicFormControlModel[] {
    let model = [];
    if (schema === null) {
      return model;
    }

    // TODO
    // const elements = _.sortBy(schema, 'position');
    const elements = schema;
    for (let element of elements as any) {
      let value = values[element.fieldId];
      switch (element.type) {
        case 'textarea':
          model.push(this.createTextareaModel(element, value));
          break;

        case 'checkbox':
          model.push(this.createCheckboxModel(element, value));
          break;

        case 'select':
          model.push(this.createSelectModel(element, value));
          break;

        case 'radio':
          model.push(this.createRadioModel(element, value));
          break;

        case 'input':
        default:
          model.push(this.createInputModel(element, value));
          break;
      }
    }

    return model;
  }

  // TODO we use 'label' instead of placeholder because of the focus issue upon
  // initializing the form: the placeholder doesn't float above the control.

  createInputModel(element, value) {
    return new DynamicInputModel({
      id: element.fieldId,
      label: element.label,
      value: typeof value !== undefined && value || element.defaultValue,
      // maxLength: 42,
      // minLength: 3,
      list: element.list || null,
      required: element.required,
    }, FORM_ELM_DEFAULT_CLASSES);
  }

  createTextareaModel(element, value) {
    return new DynamicTextAreaModel({
      id: element.fieldId,
      label: element.label,
      value: typeof value !== undefined && value || element.defaultValue,
      required: element.required,
    }, FORM_ELM_DEFAULT_CLASSES);
  }

  createCheckboxModel(element, value) {
    return new DynamicCheckboxModel({
      id: element.fieldId,
      label: element.label,
      value: typeof value !== undefined && value || element.defaultValue,
      required: element.required,
    }, FORM_ELM_DEFAULT_CLASSES);
  }

  createSelectModel(element, value) {
    return new DynamicSelectModel({
      id: element.fieldId,
      label: element.label,
      options: element.options,
      value: typeof value !== undefined && value || element.defaultValue,
      required: element.required,
    }, FORM_ELM_DEFAULT_CLASSES);
  }

  createRadioModel(element, value) {
    return new DynamicRadioGroupModel({
      id: element.fieldId,
      label: element.label,
      options: element.options,
      value: typeof value !== undefined && value || element.defaultValue,
      required: element.required,
    }, FORM_ELM_DEFAULT_CLASSES);
  }
}
