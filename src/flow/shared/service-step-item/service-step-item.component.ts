import { ServiceStep } from './../../models/service-step.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dkt-service-step-item',
  templateUrl: 'service-step-item.component.html',
  styleUrls: ['service-step-item.component.css']
})
export class ServiceStepItemComponent {
  @Input() serviceStep: ServiceStep;
}
