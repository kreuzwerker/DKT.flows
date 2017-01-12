import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Flow, Step } from '../../models';
import * as stepHelpers from './../../utils/step.helpers';

export class FlowStepItemOption {
  title: string;
  icon?: string;
  classes?: Array<string>;
  link?: string;
}

@Component({
  selector: 'dkt-flow-step-item',
  templateUrl: 'flow-step-item.component.html',
  styleUrls: ['flow-step-item.component.css'],
})
export class FlowStepItemComponent implements OnInit, OnChanges {
  @Input() flow: Flow;
  @Input() step: Step;
  @Input() currentActive: string;

  headerIcon: string;
  headerTitle: string;
  options: FlowStepItemOption[];

  ngOnInit() {
    this.render();
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['step'] !== undefined || changes['currentActive'] !== undefined) {
      this.render();
    }
  }

  render() {
    let basePath = `/flows/${this.flow.id}/steps/${this.step.id}/`;
    this.options = this.getStepOptions(this.step, this.currentActive, basePath);

    if (stepHelpers.stepHasService(this.step)) {
      let provider = this.step.provider;
      let service = this.step.service;
      this.headerIcon = provider.icon;
      this.headerTitle = `${provider.name}: ${service.name}`;
    } else {
      this.headerIcon = 'settings';
      this.headerTitle = 'Set up this step';
    }
  };

  getStepOptions(
    step: Step,
    currentActive: string,
    basePath: string
  ): FlowStepItemOption[] {
    let options = [],
        typeName = stepHelpers.getStepServiceTypeName(step);

    // Select service step:
    let selectOption: FlowStepItemOption = {
      title: 'Select ' + typeName,
      icon: 'flash_on',
      link: basePath + 'select-service'
    };
    // Active?
    selectOption.classes = (currentActive === 'select') ? ['active'] : [];
    options.push(selectOption);

    // Configure step:
    let configureOption: FlowStepItemOption = { title: 'Configure ' + typeName };
    // Active?
    configureOption.classes = (currentActive === 'configure') ? ['active'] : [];
    // Locked?
    let conigureLocked = !stepHelpers.stepHasService(step) || !stepHelpers.stepIsConfigured(step);
    configureOption.icon    = conigureLocked ? 'lock' : 'settings';
    configureOption.classes = conigureLocked ?
      configureOption.classes.concat(['locked']) :
      configureOption.classes;
    configureOption.link    = conigureLocked ? basePath + 'configure' : null;
    options.push(configureOption);

    // Test step:
    let testOption: FlowStepItemOption = { title: 'Test ' + typeName};
    // Active?
    testOption.classes = (currentActive === 'test') ? ['active'] : [];
    // Locked?
    let testLocked = (!stepHelpers.stepHasService(step) ||
      !stepHelpers.stepIsConfigured(step) ||
      !stepHelpers.stepIsTested(step));
    testOption.icon    = testLocked ? 'lock' : 'check';
    testOption.classes = testLocked ? testOption.classes.concat(['locked']) : testOption.classes;
    testOption.link    = testLocked ? basePath + 'test' : null;
    options.push(testOption);

    return options;
  }
}
