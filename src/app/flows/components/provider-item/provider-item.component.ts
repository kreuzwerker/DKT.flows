import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Provider } from './../../models';

@Component({
  selector: 'dkt-provider-item',
  templateUrl: 'provider-item.component.html',
  styleUrls: ['provider-item.component.css']
})
export class ProviderItemComponent {
  @Input() provider: Provider;
  @Input() isSelected: boolean;
  @Output() onSelectProvider = new EventEmitter();

  select() {
    this.onSelectProvider.emit({ provider: this.provider });
  }
}
