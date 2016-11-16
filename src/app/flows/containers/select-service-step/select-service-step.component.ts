import { Component, OnInit } from '@angular/core';

import { Flow, Step } from '../../models'
import { FlowsStateService } from './../../';

// import { SERVICES } from './../../components/services/services.component';

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
          name: 'New item in feed'
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
