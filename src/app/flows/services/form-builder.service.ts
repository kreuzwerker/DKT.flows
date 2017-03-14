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
    container: "control full-width"
  }
}

@Injectable()
export class FormBuilderService {

  constructor() { }

  createFormModel(schema: ServiceConfigSchema, values): DynamicFormControlModel[] {
    let model = [];
    const elements = _.sortBy(this.schemaMocks[service.id], 'position');
    for (let element of elements as any) {
      let value = values[element.id];
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
      id: element.id,
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
      id: element.id,
      label: element.label,
      value: typeof value !== undefined && value || element.defaultValue,
      required: element.required,
    }, FORM_ELM_DEFAULT_CLASSES);
  }

  createCheckboxModel(element, value) {
    return new DynamicCheckboxModel({
      id: element.id,
      label: element.label,
      value: typeof value !== undefined && value || element.defaultValue,
      required: element.required,
    }, FORM_ELM_DEFAULT_CLASSES);
  }

  createSelectModel(element, value) {
    return new DynamicSelectModel({
      id: element.id,
      label: element.label,
      options: element.options,
      value: typeof value !== undefined && value || element.defaultValue,
      required: element.required,
    }, FORM_ELM_DEFAULT_CLASSES);
  }

  createRadioModel(element, value) {
    return new DynamicRadioGroupModel({
      id: element.id,
      label: element.label,
      options: element.options,
      value: typeof value !== undefined && value || element.defaultValue,
      required: element.required,
    }, FORM_ELM_DEFAULT_CLASSES);
  }

  // Schema mocks

  schemaMocks = {
    ciy0jeruzbb5m01790ymkz7xl: [ // "New kitten in RSS feed."
      {
        position: 0,
        id: 'https',
        label: 'HTTPS',
        type: 'checkbox',
        defaultValue: true,
        required: true,
      },
      {
        position: 1,
        id: 'feed_select',
        label: 'Select example',
        type: 'select',
        options: [
          { label: "Option 1", value: 'option-1' },
          { label: "Option 2", value: 'option-2' },
          { label: "Option 3", value: 'option-3' },
        ],
        defaultValue: 'option-2',
        required: true,
      },
      {
        position: 2,
        id: 'feed_radio',
        label: 'Radio example',
        type: 'radio',
        options: [
          { label: "Option 1", value: 'option-1' },
          { label: "Option 2", value: 'option-2' },
          { label: "Option 3", value: 'option-3' },
        ],
        defaultValue: 'option-1',
        required: true,
      },
      {
        position: 3,
        id: 'feed_url',
        label: 'RSS feed URL',
        type: 'input',
        // list: ['One', 'Two', 'Three'],
        defaultValue: 'rss://default',
        required: true,
      },
      {
        position: 4,
        id: 'comment',
        label: 'Comment',
        type: 'textarea',
        defaultValue: 'Sample comment',
        required: false,
      }
    ],
    ciy0jg7bpbbcl01791wvcejt5: [ // "Sing halleluja"
      {
        position: 0,
        id: 'input_1',
        label: 'Sing what?',
        type: 'input',
        defaultValue: 'halleluja',
        required: true,
      },
      {
        position: 1,
        id: 'input_2',
        label: 'How many times?',
        type: 'input',
        defaultValue:  '1',
        required: true,
      },
    ]
  };

}
