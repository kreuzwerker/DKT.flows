import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Service } from './../../models/service.model';

@Component({
  selector: 'dkt-service-detail',
  templateUrl: 'service-detail.component.html',
  styleUrls: ['service-detail.component.css']
})
export class ServiceDetailComponent {
  @Input() service: Service;
  @Output() onClose = new EventEmitter();

  show: boolean = false;

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
    this.onClose.emit();
  }
}
