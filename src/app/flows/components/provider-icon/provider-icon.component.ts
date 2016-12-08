import { Component, Input } from '@angular/core';

@Component({
  selector: 'dkt-provider-icon',
  templateUrl: 'provider-icon.component.html',
  styleUrls: ['provider-icon.component.css']
})
export class ProviderIconComponent {
  @Input() icon: string;
}
