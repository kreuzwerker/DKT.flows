import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dkt-step-config-summary',
  templateUrl: 'step-config-summary.component.html',
  styleUrls: ['step-config-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepConfigSummaryComponent implements OnInit {
  @Input() schema;
  @Input() values;

  config;

  ngOnInit() {
    this.render();
  }

  render() {
    if (this.schema) {
      const values = this.reduceValues(this.values);
      this.config = this.schema.map((element) => {
        return Object.assign({}, element, {
          value: values[element.fieldId] ? values[element.fieldId] : ''
        });
      });
    } else {
      this.config = [];
    }
  }

  reduceValues(values) {
    return values.reduce((a, b) => {
      return Object.assign(a, { [b.fieldId]: b.value });
    }, {});
  }
}
