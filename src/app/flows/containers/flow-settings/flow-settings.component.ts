import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow, FlowTriggerType, StepSchedulingIntervalType } from './../../models';
import { flowTriggerTypeCanBeAutoamtic } from './../../utils';
import * as flowHelpers from '../../utils/flow.helpers';

@Component({
  selector: 'flow-settings',
  templateUrl: 'flow-settings.component.html',
  styleUrls: ['flow-settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowSettingsComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  flowSub$: Subscription;

  selectedTabIndex = 0;
  flowTriggerType = FlowTriggerType;
  intervalType = StepSchedulingIntervalType;

  triggerDate = null;
  triggerTime = null;
  triggerInterval = null;
  triggerIntervalType = null;

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
    public route: ActivatedRoute,
    public snackBar: MdSnackBar
  ) {
    const url = this.route.snapshot.url;
    this.selectedTabIndex = url[1] && url[1].path === 'triggering' ? 1 : 0;
  }

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

    const triggerStep = flowHelpers.getFlowTriggerStep(flow);
    let datetime;
    if (triggerStep && triggerStep.scheduling) {
      datetime = this.getDatetime(triggerStep.scheduling.startDatetime);
      this.triggerInterval = triggerStep.scheduling.interval;
      this.triggerIntervalType = triggerStep.scheduling.intervalType;
    } else {
      const date = new Date();
      datetime = this.getDatetime(date.toISOString());
      this.triggerInterval = 1;
      this.triggerIntervalType = StepSchedulingIntervalType.HOURS;
    }
    this.triggerDate = datetime[0];
    this.triggerTime = datetime[1];

    this.cd.markForCheck();
  }

  saveSettings(form) {
    if (form.valid) {
      if (form.value.triggerType === FlowTriggerType.SCHEDULED) {
        this.flowsApp.updateFlowScheduling({
          startDatetime: this.makeIsoDatetime(
            this.triggerDate,
            this.triggerTime
          ),
          interval: this.triggerInterval,
          intervalType: this.triggerIntervalType
        });
      }

      this.flowsApp
        .updateFlow({
          name: form.value.name,
          description: form.value.description,
          triggerType: form.value.triggerType
        })
        .subscribe(
          () => this.showInfoMessage(`Updated flow settings.`),
          err => console.log(err)
        );
      this.router.navigate(['flows', this.flow.id]);
    }
  }

  deleteFlow() {
    this.flowsApp.showStatusMessage('Deleting flow', 'loading');
    this.flowsApp.deleteFlow().subscribe(
      () => {
        this.flowsApp.hideStatusMessage();
        this.showInfoMessage(`Deleted flow "${this.flowsApp.flow.name}".`);
        this.router.navigate(['flows']);
      },
      err => {
        this.flowsApp.hideStatusMessage();
        this.showInfoMessage(`An error occured. Could not delete the flow.`);
      }
    );
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

  getDatetime(isoDatetime: string): string[] {
    let datetime = isoDatetime.split('T');
    // Use hh:ii time format
    datetime[1] = datetime[1].replace(/^(\d\d:\d\d).*/, '$1');
    return datetime;
  }

  makeIsoDatetime(date: string, time: string): string {
    // Adds ':00' seconds to time
    return `${date}T${time}:00`;
  }

  isAutomaticEnabled(): boolean {
    return this.flow.id ? flowTriggerTypeCanBeAutoamtic(this.flow) : false;
  }

  isManual(form): boolean {
    return form.value.triggerType === FlowTriggerType.MANUAL;
  }

  isAutomatic(form): boolean {
    return form.value.triggerType === FlowTriggerType.AUTOMATIC;
  }

  isScheduled(form): boolean {
    return form.value.triggerType === FlowTriggerType.SCHEDULED;
  }
}
