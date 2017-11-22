import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { StepTestResultType } from './../../../flows/models';
import { createAnnotationsDom } from './lib/annotations';

@Component({
  selector: 'dkt-render',
  templateUrl: 'render.component.html',
  styleUrls: ['render.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RenderComponent implements OnChanges {
  @Input() type: StepTestResultType = StepTestResultType.HTML;
  @Input() data: any = null;
  @ViewChild('annotations') annotationsContainer: ElementRef;

  types = StepTestResultType;
  renderData: string = '';

  ngOnChanges(changes: SimpleChanges) {
    this.render();
  }

  clear() {
    if (this.type !== StepTestResultType.ANNOTATIONS) {
      this.annotationsContainer.nativeElement.innerHTML = '';
    }
  }

  render() {
    this.clear();

    if (this.type === StepTestResultType.HTML) {
      this.renderHtml(this.data);
    } else if (this.type === StepTestResultType.JSON) {
      this.renderJson(this.data);
    } else if (this.type === StepTestResultType.ANNOTATIONS) {
      this.renderAnnotations(this.data);
    } else {
      this.renderText(this.data);
    }
  }

  renderHtml(html: string): void {
    this.renderData = html;
  }

  renderJson(json: object): void {
    // Format json
    this.renderData =
      typeof json === 'object' ? JSON.stringify(json, null, '  ') : json;
  }

  renderAnnotations(annotations): void {
    annotations =
      typeof annotations === 'string' ? JSON.parse(annotations) : annotations;

    createAnnotationsDom(
      this.annotationsContainer,
      annotations.text,
      annotations.ents
    );
  }

  renderText(text: string): void {
    this.renderData = text;
  }

  showPopup() {
    let win = window.open('', 'DKT – Result view', 'resizable=yes');
    win.document.open();
    win.document.write(this.renderData);
    win.document.close();
  }
}
