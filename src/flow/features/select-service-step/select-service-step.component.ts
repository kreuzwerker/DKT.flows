import { Component } from '@angular/core';

import { Flow } from '../../models/flow.model'
import { Step } from '../../models/step.model'

// import { SERVICES } from './../../shared/services/services.component';

// Flow mock
const FLOW: Flow = {
  id: 1,
  name: 'First flow',
  description: "This is a mocked flow object.",
  steps: [
    { id: 1 },
    { id: 2, 
      service: {
        name: 'RSS',
        icon: 'rss_feed',
        step: {
          name: 'New Item in Feed'
        }
      }
    }
  ]
}


@Component({
  selector: 'dkt-select-service-step',
  templateUrl: 'select-service-step.component.html',
  styleUrls: ['select-service-step.component.css']
})

export class SelectServiceStepComponent {
  flow = FLOW;

  constructor() {
  }
}
