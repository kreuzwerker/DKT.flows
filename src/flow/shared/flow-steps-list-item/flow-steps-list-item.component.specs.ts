/*
 * Testing a simple Angular 2 component
 * More info: https://angular.io/docs/ts/latest/guide/testing.html#!#simple-component-test
 */

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FlowStepsListItemComponent } from './flow-steps-list-item.component';

describe('FlowStepsListItemComponent', () => {
    let fixture, comp, el;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FlowStepsListItemComponent],
            providers: []
        });

        fixture = TestBed.createComponent(FlowStepsListItemComponent);
        comp = fixture.componentInstance;

        // el = fixture.debugElement.query(By.css('h1'));
    });

    
    describe('Given step without service step', () => {
        
        it('should show the dialog to set up the step', () => {            
        });
            
    });
        

    it('should enter the assertion', () => {
        fixture.detectChanges();
        // expect(el.nativeElement.textContent).toContain('Test Title');
        // expect((fixture.debugElement.classes as any).className).toBe(true);
        expect(enterAValue).toBe(enterTheExpectedResult);
    });
});
