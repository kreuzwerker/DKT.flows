import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginService } from './core/services';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dkt-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private mdIconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    // Register custom DKT icons
    mdIconRegistry.addSvgIcon(
      'flow', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/flow.svg')
    );
    mdIconRegistry.addSvgIcon(
      'sort_asc', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/sort_asc.svg')
    );
    mdIconRegistry.addSvgIcon(
      'sort_desc', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/sort_desc.svg')
    );
  }

  showToolbar() {
    return UserLoginService.isSignedIn() !== false;
  }

  activateEvent(event) {
    if (ENV === 'development') {
      // console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      // console.log('Deactivate Event', event);
    }
  }
}
