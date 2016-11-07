/*
 * Testing a simple Angular 2 component
 * More info: https://angular.io/docs/ts/latest/guide/testing.html#!#simple-component-test
 */

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectServiceStepComponent } from './select-service-step.component';

describe('SelectServiceStepComponent', () => {
    let fixture, comp, el;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SelectServiceStepComponent],
            providers: []
        });

        fixture = TestBed.createComponent(SelectServiceStepComponent);
        comp = fixture.componentInstance;

        // el = fixture.debugElement.query(By.css('h1'));
    });

    it('should enter the assertion', () => {
        fixture.detectChanges();
        expect(el.nativeElement.textContent).toContain('Select service step');
        // expect((fixture.debugElement.classes as any).className).toBe(true);
        // expect(enterAValue).toBe(enterTheExpectedResult);
    });
});
