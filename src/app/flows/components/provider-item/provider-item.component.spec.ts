/* tslint:disable: ter-max-len */
import { Provider } from './../../models';
import { TestUtils } from './../../utils/test.helpers';
import { ProviderItemComponent } from './provider-item.component';

describe('Flows App', () => {
  describe('ProviderDetail Component', () => {
    let component: ProviderItemComponent;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      component = new ProviderItemComponent();
      expect(component).toBeTruthy();
    });

    // UI
    // - should display item as selected if is selected
    // - I can select the step

    describe('select()', () => {
      it('should emit an onSelectProvider event with the correct params', () => {
        spyOn(component.onSelectProvider, 'emit');
        const provider: Provider = utils.createProviderData();
        component.provider = provider;
        component.select();
        expect(component.onSelectProvider.emit).toHaveBeenCalledWith({provider: provider});
      });
    });
  });
});
