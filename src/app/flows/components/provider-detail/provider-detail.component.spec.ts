/* tslint:disable: ter-max-len */
import { SimpleChange } from '@angular/core';
import { Provider, Service, ServiceType } from './../../models';
import { TestUtils } from './../../utils/test.helpers';
import { ProviderDetailComponent } from './provider-detail.component';
import { MockChangeDetectorRef } from '../../utils/test.helpers';

describe('Flows App', () => {
  describe('ProviderDetail Component', () => {
    let component: ProviderDetailComponent;
    let cd: MockChangeDetectorRef;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      cd = <any>new MockChangeDetectorRef();
      component = new ProviderDetailComponent(cd);
      expect(component).toBeTruthy();
    });

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

    it('should correctly initialize properties', () => {
      expect(component.show).toBeFalsy();
      expect(component.triggerServices).toEqual([]);
      expect(component.actionServices).toEqual([]);
      expect(component.selectedTabIndex).toBe(0);
    });

    describe('ngOnChanges()', () => {
      it('should call processProvider() when the provider input changes', () => {
        spyOn(component, 'processProvider');
        spyOn(component, 'processSelectableServiceType');
        const provider = utils.createProviderData();
        component.ngOnChanges({ provider: new SimpleChange(null, provider)});
        expect(component.processProvider).toHaveBeenCalledWith(provider);
        expect(component.processSelectableServiceType).not.toHaveBeenCalled();
      });

      xit('should call processSelectableServiceType() when the selectableServiceType input changes', () => {
        spyOn(component, 'processProvider');
        spyOn(component, 'processSelectableServiceType');
        const serviceType = ServiceType.TRIGGER;
        component.ngOnChanges({ selectableServiceType: new SimpleChange(null, serviceType)});
        expect(component.processSelectableServiceType).toHaveBeenCalledWith(serviceType);
        expect(component.processProvider).not.toHaveBeenCalled();
      });
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
      it('should set the current services correctly if the given provider has any services', () => {
        const provider: Provider = utils.createProviderData();
        component.processProvider(provider);
        expect(component.triggerServices).not.toEqual([]);
        expect(component.actionServices).not.toEqual([]);
      });

      it('should set the current services correctly if the given provider has no services', () => {
        component.processProvider();
        expect(component.triggerServices).toEqual([]);
        expect(component.actionServices).toEqual([]);
      });
    });

    describe('processSelectableServiceType()', () => {
      it('should select the Trigger tab if the given type is Trigger', () => {
        component.processSelectableServiceType(ServiceType.TRIGGER);
        expect(component.selectedTabIndex).toBe(0);
      });

      it('should select the Action tab if the given type is Action', () => {
        component.processSelectableServiceType(ServiceType.ACTION);
        expect(component.selectedTabIndex).toBe(1);
      });
    });

    describe('selectService()', () => {
      it('should emit an onSelectService event with the correct params', () => {
        spyOn(component.onSelectService, 'emit');
        const service: Service = utils.createServiceData();
        component.selectService(service);
        expect(component.onSelectService.emit).toHaveBeenCalledWith({service: service});
      });
    });
  });
});
