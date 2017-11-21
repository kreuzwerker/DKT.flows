import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow } from './../../models';

@Component({
  selector: 'flow-settings',
  templateUrl: 'flow-settings.component.html',
  styleUrls: ['flow-settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowSettingsComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  flowSub$: Subscription;

  triggerTypes = {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    SCHEDULED: 'scheduled'
  };

  triggerType = null;

  flow: Flow = {
    id: null,
    name: '',
    description: ''
  } as Flow;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public state: FlowsStateService,
    public router: Router,
    public snackBar: MdSnackBar
  ) {}

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage(null);

    this.flowSub$ = this.state.flow$.subscribe(
      this.onSelectFlow.bind(this),
      err => console.log('error', err)
    );
  }

  onSelectFlow(flow: Flow) {
    this.flow = flow;
    // TODO set from flow.triggerType ?
    this.triggerType = this.triggerTypes.MANUAL;
    this.cd.markForCheck();
  }

  saveSettings(form) {
    if (form.valid) {
      this.flowsApp
        .updateFlow({
          name: form.value.name,
          description: form.value.description
        })
        .subscribe(
          () => this.showInfoMessage(`Updated flow settings.`),
          err => console.log(err)
        );
      this.router.navigate(['flows', this.flow.id]);
    }
  }

  showInfoMessage(message: string) {
    let config = new MdSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, 'OK', config);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  /**
   * Helper functions
   */

  isManual() {
    return this.triggerType === this.triggerTypes.MANUAL;
  }

  isAutomatic() {
    return this.triggerType === this.triggerTypes.AUTOMATIC;
  }

  isScheduled() {
    return this.triggerType === this.triggerTypes.SCHEDULED;
  }
}
