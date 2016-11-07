import { Component, Input } from '@angular/core';
import { Service } from './../../models/service.model';

@Component({
  selector: 'dkt-service',
  templateUrl: 'service.component.html',
  styleUrls: ['service.component.css']
})
export class ServiceComponent {
  @Input() service: Service;
}
