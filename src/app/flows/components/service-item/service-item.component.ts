import { Service } from './../../models';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dkt-service-item',
  templateUrl: 'service-item.component.html',
  styleUrls: ['service-item.component.css']
})
export class ServiceItemComponent {
  @Input() service: Service;
}
