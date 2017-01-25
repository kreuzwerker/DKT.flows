/* tslint:disable: ter-max-len */
describe('Flows App', () => {

  describe('FlowStepConfigNav Component', () => {
    describe('showStepNav()', () => {
      xit('should return true if the current and requested step are both "select"', () => {
      });

      xit('should return false if the current ste is "select" but the requested step is not', () => {
      });

      xit('should return true if the current step is not "select"', () => {
      });
    });

    describe('getStepIconType()', () => {
      xit('should return "number" if the requested and the current step are both "select"', () => {
      });

      xit('should return "check" if the requested step is "select" but the current step is not', () => {
      });

      xit('should return "number" if the requested step is "configure" and the current step is "select" or "configure"', () => {
      });

      xit('should return "check" if the requested step is "configure" but the current step neither "select" nor "configure"', () => {
      });

      xit('should return "number" if the requested step is "test"', () => {
      });

      xit('should return "undefined" if the requested step is neither "select", "configure" nor "test"', () => {
      });
    });
  });
});

// import { TestBed, async } from '@angular/core/testing';
// import { ChangeDetectionStrategy } from '@angular/core';
// // import { ComponentFixtureAutoDetect } from '@angular/core/testing';

// import { MaterialModule } from '@angular/material';

// import { FlowStepConfigNavComponent } from './flow-step-config-nav.component';

// describe('FlowStepConfigNavComponent', () => {
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 MaterialModule.forRoot(),
//             ],
//             declarations: [FlowStepConfigNavComponent],
//             providers: [
//                 // for automatic change detection
//                 // { provide: ComponentFixtureAutoDetect, useValue: true }
//             ]
//         })

//         // this is a temporary workaround, as fixture.detectChanges() isn't working
//         // for components with ChangeDetectionStrategy.OnPush
//         .overrideComponent(FlowStepConfigNavComponent, {
//             set: { changeDetection: ChangeDetectionStrategy.Default }
//         })

//         // for components with ChangeDetectionStrategy.OnPush, .compileComponents() must
//         // always be called first
//         .compileComponents();
//     }));

//     describe('Current step set to "select"', () => {
//       it('should only show the select step', async(() => {
//         let fixture = TestBed.createComponent(FlowStepConfigNavComponent);
//         let comp = fixture.componentInstance;
//         fixture.detectChanges();

//         // example below for an input with a boolean value
//         // e.g. @Input() isSelected: boolean = false
//         comp.current = 'select';

//         // method below must be called to update DOM for latest changes
//         fixture.detectChanges();

//         expect(comp.show('select')).toBeTruthy();
//         expect(comp.show('configure')).toBeFalsy();
//         expect(comp.show('test')).toBeFalsy();
//       }));
//     });

//     describe('Current step set to "configure"', () => {
//       it('should show all steps', async(() => {
//         let fixture = TestBed.createComponent(FlowStepConfigNavComponent);
//         let comp = fixture.componentInstance;
//         fixture.detectChanges();

//         // example below for an input with a boolean value
//         // e.g. @Input() isSelected: boolean = false
//         comp.current = 'configure';

//         // method below must be called to update DOM for latest changes
//         fixture.detectChanges();

//         expect(comp.show('select')).toBeTruthy();
//         expect(comp.show('configure')).toBeTruthy();
//         expect(comp.show('test')).toBeTruthy();
//       }));
//     });
// });


