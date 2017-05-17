import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
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

  @ViewChild('frame') frame: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    // Don't update results upon errors
    if (this.type !== StepTestResultType.ERROR) {
      this.updateTestResults();
    }
  }

  public updateTestResults() {
    let html = this.type === StepTestResultType.HTML ? this.data : '';
    this.setFrameContents(html);
  }

  setFrameContents(html: String) {
    let document = this.frame.nativeElement.contentWindow.document;
    document.open();
    document.write(html);
    document.close();
  }
}
