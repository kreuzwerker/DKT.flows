import { Component, Input } from '@angular/core';

@Component({
  selector: 'dkt-loading-indicator',
  templateUrl: 'loading-indicator.component.html',
  styleUrls: ['loading-indicator.component.css']
})
export class LoadingIndicatorComponent {
  @Input() text: string;
}
