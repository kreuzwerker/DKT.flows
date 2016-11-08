import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../models/step.model';

@Component({
  selector: 'dkt-flow-steps-list-item',
  templateUrl: 'flow-steps-list-item.component.html',
  styleUrls: ['flow-steps-list-item.component.css'],
})
export class FlowStepsListItemComponent implements OnInit {
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
      this.headerIcon = service.icon;
      this.headerTitle = `${service.name}: ${service.step.name}`;
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
