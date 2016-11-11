import { TestBed, async } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
// import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { MaterialModule } from '@angular/material';

import { FlowStepConfigNavComponent } from './flow-step-config-nav.component';

describe('FlowStepConfigNavComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule.forRoot(),
            ],
            declarations: [FlowStepConfigNavComponent],
            providers: [
                // for automatic change detection
                // { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        })

        // this is a temporary workaround, as fixture.detectChanges() isn't working
        // for components with ChangeDetectionStrategy.OnPush
        .overrideComponent(FlowStepConfigNavComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        })

        // for components with ChangeDetectionStrategy.OnPush, .compileComponents() must
        // always be called first
        .compileComponents();
    }));

    describe('Current step set to "select"', () => {
      it('should only show the select step', async(() => {
        let fixture = TestBed.createComponent(FlowStepConfigNavComponent);
        let comp = fixture.componentInstance;
        fixture.detectChanges();

        // example below for an input with a boolean value
        // e.g. @Input() isSelected: boolean = false
        comp.current = 'select';

        // method below must be called to update DOM for latest changes
        fixture.detectChanges();

        expect(comp.show('select')).toBeTruthy();
        expect(comp.show('configure')).toBeFalsy();
        expect(comp.show('test')).toBeFalsy();
      }));
    });

    describe('Current step set to "configure"', () => {
      it('should show all steps', async(() => {
        let fixture = TestBed.createComponent(FlowStepConfigNavComponent);
        let comp = fixture.componentInstance;
        fixture.detectChanges();

        // example below for an input with a boolean value
        // e.g. @Input() isSelected: boolean = false
        comp.current = 'configure';

        // method below must be called to update DOM for latest changes
        fixture.detectChanges();

        expect(comp.show('select')).toBeTruthy();
        expect(comp.show('configure')).toBeTruthy();
        expect(comp.show('test')).toBeTruthy();
      }));
    });
});


