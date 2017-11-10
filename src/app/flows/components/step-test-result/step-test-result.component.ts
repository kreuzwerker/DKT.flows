import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StepTestResultType } from '../../models';

@Component({
  selector: 'dkt-step-test-result',
  templateUrl: 'step-test-result.component.html',
  styleUrls: ['step-test-result.component.css']
})
export class StepTestResultComponent implements OnChanges {
  @Input() type: StepTestResultType = null;
  @Input() data: String = null;
  @Input() show: Boolean = false;

  renderData: String = null;
  renderType: StepTestResultType = StepTestResultType.TEXT;

  ngOnChanges(changes: SimpleChanges) {
    // Don't update results upon errors
    if (this.type !== StepTestResultType.ERROR) {
      this.renderData = this.data;
      this.renderType = this.type;
    }
  }
}
