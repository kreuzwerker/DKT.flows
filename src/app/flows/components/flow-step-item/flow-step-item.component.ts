import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../models/step.model';

@Component({
  selector: 'dkt-flow-step-item',
  templateUrl: 'flow-step-item.component.html',
  styleUrls: ['flow-step-item.component.css'],
})
export class FlowStepItemComponent implements OnInit {
  @Input() step: Step;

  headerIcon: string;
  headerTitle: string;
  options: { icon: string, title: string, classes: Array<string> }[];

  ngOnInit() {
    this.render();
  };

  render() {
    if (this.step && this.step.service) {
      let service = this.step.service;
      let serviceStep = this.step.serviceStep;
      this.headerIcon = service.icon;
      this.headerTitle = `${service.name}: ${serviceStep.name}`;
      this.options = [
        { icon: 'flash_on', title: 'Select Trigger', classes: []},
        { icon: 'settings', title: 'Configure Trigger', classes: ['active']},
        { icon: 'lock', title: 'Test Trigger', classes: ['locked']},
      ];
    } else {
      this.headerIcon = 'settings';
      this.headerTitle = 'Set up this step';
      this.options = [
        { icon: 'lock', title: 'Select', classes: ['locked']},
        { icon: 'lock', title: 'Configure', classes: ['locked']},
        { icon: 'lock', title: 'Test', classes: ['locked']},
      ];
    }
  };
}
