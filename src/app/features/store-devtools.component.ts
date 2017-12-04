import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-store-devtools',
  templateUrl: './store-devtools.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
  mat-sidenav-layout {
    width: 70% !important;
  }
  `]
})

export class StoreDevToolsComponent {}
