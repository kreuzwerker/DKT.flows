import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'dkt-render',
  templateUrl: 'render.component.html',
  styleUrls: ['render.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RenderComponent implements OnChanges {
  @Input() type: string = 'html';
  @Input() data: String = null;
  @ViewChild('frame') frame: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    this.renderHtml(changes['data']['currentValue']);
  }

  renderHtml(html: String) {
    let document = this.frame.nativeElement.contentWindow.document;
    document.open();
    document.write(html);
    document.close();
  }
}
