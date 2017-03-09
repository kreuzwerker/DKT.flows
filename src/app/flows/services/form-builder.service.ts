import { Injectable } from '@angular/core';
import { Service } from './../models';
import {
    DynamicFormControlModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicTextAreaModel,
    DynamicRadioGroupModel,
    DynamicSelectModel,
} from '@ng2-dynamic-forms/core';

@Injectable()
export class FormBuilderService {

  constructor() { }

  createFormModel(service: Service, values): DynamicFormControlModel[] {
    if (!this.schemaMocks[service.id]) {
      return [];
    }

    let model = [];
    const elements = this.schemaMocks[service.id];
    for (let element of elements) {
      let value = values[element.id];
      switch (element.type) {
        case 'textarea':
          model.push(this.createTextareaModel(element, value));
          break;

        case 'input':
        default:
          model.push(this.createInputModel(element, value));
          break;
      }
    }

    return model;
  }

  createInputModel(element, value) {
    return new DynamicInputModel({
      id: element.id,
      label: element.label,
      value: typeof value !== undefined && value || element.defaultValue,
      // maxLength: 42,
      // minLength: 3,
      // placeholder: "example input",
      required: element.required,
    });
  }

  createTextareaModel(element, value) {
    return new DynamicTextAreaModel({
      id: element.id,
      label: element.label,
      value: typeof value !== undefined && value || element.defaultValue,
      required: element.required,
    });
  }

  // Schema mocks

  schemaMocks = {
    ciy0jeruzbb5m01790ymkz7xl: [ // "New kitten in RSS feed."
      {
        position: 0,
        id: 'feed_url',
        label: 'RSS feed URL',
        type: 'input',
        defaultValue: 'rss://default',
        required: true,
      },
      {
        position: 1,
        id: 'comment',
        label: 'Comment',
        type: 'textarea',
        defaultValue: '',
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
