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
export class FlowStepItemComponent implements OnInit {
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
      this.render()
    }
  }

  render() {
    let basePath = `/flows/${this.flow.id}/steps/${this.step.id}/`;
    this.options = this.getStepOptions(this.step, this.currentActive, basePath);

    if (stepHelpers.stepHasService(this.step)) {
      let service = this.step.service;
      let serviceStep = this.step.serviceStep;
      this.headerIcon = service.icon;
      this.headerTitle = `${service.name}: ${serviceStep.name}`;
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
    var options = []
  
    // Select service:
    var option: FlowStepItemOption = { title: 'Select Trigger', icon: 'flash_on', link: basePath + 'select-service-step' };
    // Active?
    option.classes = (currentActive == 'select') ? ['active']: [];
    options.push(option);
  
    // Configure step:
    var option: FlowStepItemOption = { title: 'Configure Trigger' };
    // Active?
    option.classes = (currentActive == 'configure') ? ['active']: [];
    // Locked?
    var locked = !stepHelpers.stepHasService(step) || !stepHelpers.stepIsConfigured(step);
    option.icon    = locked ? 'lock': 'settings';
    option.classes = locked ? ['locked']: [];
    option.link    = locked ? basePath + 'configure-step' : null;
    options.push(option);
  
    // Test step:
    var option: FlowStepItemOption = { title: 'Test Trigger'};
    // Active?
    option.classes = (currentActive == 'test') ? ['active']: [];
    // Locked?
    var locked = (!stepHelpers.stepHasService(step) || !stepHelpers.stepIsConfigured(step) || !stepHelpers.stepIsTested(step));
    option.icon    = locked ? 'lock': 'check';
    option.classes = locked ? ['locked']: [];
    option.link    = locked ? basePath + 'test-step' : null;
    options.push(option);

    return options;
  }
}
