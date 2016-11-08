import { TestBed, async } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
// import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { MaterialModule } from '@angular/material';

import { FlowStepsListItemComponent } from './flow-steps-list-item.component';

describe('FlowStepsListItemComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MaterialModule.forRoot(),
            ],
            declarations: [FlowStepsListItemComponent],
            providers: [
                // for automatic change detection
                // { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        })

        // this is a temporary workaround, as fixture.detectChanges() isn't working
        // for components with ChangeDetectionStrategy.OnPush
        .overrideComponent(FlowStepsListItemComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        })

        // for components with ChangeDetectionStrategy.OnPush, .compileComponents() must
        // always be called first
        .compileComponents();
    }));

    it('should render step without service', async(() => {
        let fixture = TestBed.createComponent(FlowStepsListItemComponent);
        let comp = fixture.componentInstance;
        fixture.detectChanges();

        // example below for an input with a boolean value
        // e.g. @Input() isSelected: boolean = false
        comp.step = {
          id: 2,
        };

        // method below must be called to update DOM for latest changes
        // fixture.detectChanges();
        comp.render();

        expect(comp.headerIcon).toBe('settings');
        expect(comp.headerTitle).toBe('Set up this step');
    }));

    it('should render step with service', async(() => {
        let fixture = TestBed.createComponent(FlowStepsListItemComponent);
        let comp = fixture.componentInstance;
        fixture.detectChanges();

        // example below for an input with a boolean value
        // e.g. @Input() isSelected: boolean = false
        comp.step = {
          id: 2,
          service: {
            name: 'RSS',
            icon: 'rss_feed',
            step: {
              name: 'New Item in Feed'
            }
          }
        };

        // method below must be called to update DOM for latest changes
        // fixture.detectChanges();
        comp.render();

        expect(comp.headerIcon).toBe('rss_feed');
        expect(comp.headerTitle).toBe('RSS: New Item in Feed');
    }));

});


