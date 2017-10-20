import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/core';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Service, ServiceType, Step } from './../../models';

@Component({
  selector: 'dkt-select-service',
  templateUrl: 'select-service.component.html',
  styleUrls: ['select-service.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-out')
      ]),
      transition('* => void', [
        animate('200ms ease-out', style({transform: 'translateX(100%)'}))
      ])
    ])
  ],
})

export class SelectServiceComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  selectedService: Service | null = null;
  selectableServiceType: ServiceType = ServiceType.ACTION;
  changedSelectedService: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public state: FlowsStateService
  ) { }

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage('select');

    // Current selected step
    this.state.select('step').takeUntil(this.ngOnDestroy$).subscribe(
      this.onSelectStep.bind(this),
      (err) => console.log('error', err)
    );
  }

  onSelectStep(step: Step) {
    this.selectedService = (step && step.service !== undefined)
      ? step.service
      : null;

    // Allow 'trigger' providers steps only at the beginning of a flow
    this.selectableServiceType = (step && step.position === 0)
      ? ServiceType.TRIGGER
      : ServiceType.ACTION;
    this.cd.markForCheck();
  }

  onContinue() {
    if (this.changedSelectedService) {
      this.flowsApp.saveFlowStep();
      this.changedSelectedService = false;
    }
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
}
