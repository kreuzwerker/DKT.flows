/* tslint:disable: ter-max-len */
import { TestUtils } from './../../utils/test.helpers';
import { FlowStepConfigNavComponent } from './flow-step-config-nav.component';
describe('Flows App', () => {

  describe('FlowStepConfigNav Component', () => {
    let component: FlowStepConfigNavComponent;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      component = new FlowStepConfigNavComponent();
      expect(component).toBeTruthy();
    });

    describe('showStepNav()', () => {
      it('should return true if the current and requested step are both "select"', () => {
        component.current = 'select';
        expect(component.showStepNav('select')).toBeTruthy();
      });

      it('should return false if the current step is "select" but the requested step is not', () => {
        component.current = 'select';
        expect(component.showStepNav('configure')).toBeFalsy();
      });

      it('should return true if the current step is not "select"', () => {
        component.current = 'configure';
        expect(component.showStepNav('configure')).toBeTruthy();
      });
    });

    describe('getStepIconType()', () => {
      it('should return "number" if the requested and the current step are both "select"', () => {
        component.current = 'select';
        expect(component.getStepIconType('select')).toBe('number');
      });

      it('should return "check" if the requested step is "select" but the current step is not', () => {
        component.current = 'configure';
        expect(component.getStepIconType('select')).toBe('check');
      });

      it('should return "number" if the requested step is "configure" and the current step is "select" or "configure"', () => {
        component.current = 'select';
        expect(component.getStepIconType('configure')).toBe('number');
        component.current = 'configure';
        expect(component.getStepIconType('configure')).toBe('number');
      });

      it('should return "check" if the requested step is "configure" but the current step neither "select" nor "configure"', () => {
        component.current = 'test';
        expect(component.getStepIconType('configure')).toBe('check');
      });

      xit('should return "number" if the requested step is "test"', () => {
        expect(component.getStepIconType('test')).toBe('number');
      });

      xit('should return "undefined" if the requested step is neither "select", "configure" nor "test"', () => {
        expect(component.getStepIconType('xxx')).toBe('undefined');
      });
    });
  });
});

// import { TestBed, async } from '@angular/core/testing';
// import { ChangeDetectionStrategy } from '@angular/core';
// // import { ComponentFixtureAutoDetect } from '@angular/core/testing';

// import { DktMaterialModule } from './../../../dkt-material.module';

// import { FlowStepConfigNavComponent } from './flow-step-config-nav.component';

// describe('FlowStepConfigNavComponent', () => {
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [
//                 DktMaterialModule,
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


