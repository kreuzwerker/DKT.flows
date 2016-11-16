import { Component, Input } from '@angular/core';

@Component({
  selector: 'dkt-service-icon',
  templateUrl: 'service-icon.component.html',
  styleUrls: ['service-icon.component.css']
})
export class ServiceIconComponent {
  @Input() icon: string;
}
