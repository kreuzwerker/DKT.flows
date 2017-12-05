import { Component, ViewEncapsulation, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginService, CognitoUtil } from './core/services';
import { MatIconRegistry, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dkt-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  showMonitor = ENV === 'development' &&
    !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS); // set in constants.js file in project root

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone,
    public snackBar: MatSnackBar
  ) {
    // Register custom DKT icons
    matIconRegistry.addSvgIcon(
      'flow',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/flow.svg')
    );
    matIconRegistry.addSvgIcon(
      'sort_asc',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/sort_asc.svg')
    );
    matIconRegistry.addSvgIcon(
      'sort_desc',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/sort_desc.svg')
    );
    matIconRegistry.addSvgIcon(
      'aws',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/aws.svg')
    );
  }

  ngOnInit() {
    this.registerPublicFunctions();
  }

  ngOnDestroy() {
    this.registerPublicFunctions(false);
  }

  showMessage(message: string, type: string = 'info') {
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    config.extraClasses = [type];
    this.snackBar.open(message, 'OK', config);
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

  private registerPublicFunctions(register: boolean = true): void {
    // Make certain functionalities available outside of the angular app context
    if (register) {
      window.DKT = window.DKT || {};

      window.DKT.redirect = (paths => {
        this.ngZone.run(() => this.router.navigate(paths));
      }).bind(this);

      window.DKT.showMessage = ((message, type) => {
        this.ngZone.run(() => this.showMessage(message, type));
      }).bind(this);
    } else {
      // Deregister
      window.DKT.redirect = null;
      window.DKT.showMessage = null;
    }
  }
}
