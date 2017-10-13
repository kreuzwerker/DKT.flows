/* tslint:disable: ter-max-len */
import { SimpleChange } from '@angular/core';
import { RenderComponent } from './render.component';

describe('Core', () => {
  describe('Render Component', () => {
    let component: RenderComponent;

    beforeEach(() => {
      component = new RenderComponent();
      expect(component).toBeTruthy();
    });

    describe('ngOnChanges()', () => {
      it('should call renderHtml() when properties change', () => {
        spyOn(component, 'renderHtml');
        component.data = 'new data';
        component.ngOnChanges({ data: new SimpleChange(null, component.data, true)});
        expect(component.renderHtml).toHaveBeenCalled();
      });
    });

    describe('renderHtml()', () => {
      xit('should write the given HTML into the iframe document window', () => {
      });
    });
  });
});
