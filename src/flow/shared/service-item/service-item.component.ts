import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Service } from './../../models/service.model';

@Component({
  selector: 'dkt-service-item',
  templateUrl: 'service-item.component.html',
  styleUrls: ['service-item.component.css']
})
export class ServiceItemComponent {
  @Input() service: Service;
  @Input() isSelected: boolean;
  @Output() onSelectService = new EventEmitter();

  select() {
    this.onSelectService.emit({ service: this.service });
  }
}
