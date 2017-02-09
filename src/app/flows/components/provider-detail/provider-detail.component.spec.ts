/* tslint:disable: ter-max-len */
import { ProviderDetailComponent } from './provider-detail.component';
import { MockChangeDetectorRef } from '../../utils/test.helpers'

describe('Flows App', () => {
  describe('ProviderDetail Component', () => {
    let component: ProviderDetailComponent;
    let cd: MockChangeDetectorRef;

    beforeEach(() => {
      cd = <any>new MockChangeDetectorRef();
      component = new ProviderDetailComponent(cd);
      expect(component).toBeTruthy();
    })

    // UI
    // - should display the service icon, name and description
    // - step is the first flow step
    //   - the 'Trigger' tab should be preselected
    //   - selecting a 'Action' service step should not be possible and throw a warning
    // - step is not the first flow step
    //   - the 'Actions' tab should be preselected
    //   - selecting a 'Trigger' service step should not be possible and trow a warning
    // - step has no service step
    //   - the first service step from the list should be preselected
    // - step has a service step
    //   - the step's service step should be selected
    // - I can close the dialog

    xit('should correctly initialize properties', () => {
    });

    xit('should call processProvider() when the provider input changes', () => {
    });

    xit('should call processSelectableServiceType() when the selectableServiceType input changes', () => {
    });

    describe('open()', () => {
      it('should set show to true and trigger change detection', () => {
        spyOn(cd, 'markForCheck');
        component.open();
        expect(component.show).toBeTruthy(); 
        expect(cd.markForCheck).toHaveBeenCalled();
      });
    });

    describe('close()', () => {
      it('should set show to false and trigger change detection', () => {
        spyOn(cd, 'markForCheck');
        component.close();
        expect(component.show).toBeFalsy(); 
        expect(cd.markForCheck).toHaveBeenCalled();
      });
    });

    describe('processProvider()', () => {
      xit('should set the current services correctly if the given provider has any services', () => {
      });

      xit('should set the current services correctly if the given provider has no services', () => {
      });
    });

    describe('processSelectableServiceType()', () => {
      xit('should select the Trigger tab if the given type is Trigger', () => {
      });

      xit('should select the Action tab if the given type is Action', () => {
      });
    });

    describe('selectService()', () => {
      xit('should emit an onSelectService event with the correct params', () => {
      });
    });
  });
});
