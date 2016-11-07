import { Component, OnInit } from '@angular/core';
import { Service } from './../../models/service.model';

export const SERVICES: Array<Service> = [
  { name: 'RSS', description: 'RSS service steps.', 'icon': 'rss_feed'},
  { name: 'Email', description: 'Email service steps.', 'icon': 'mail'},
  { name: 'Filter', description: 'Filter service steps.', 'icon': 'filter_list'},
]

@Component({
  selector: 'dkt-services',
  templateUrl: 'services.component.html',
  styleUrls: ['services.component.css']
})

export class ServicesComponent implements OnInit {

  services: Array<Service>;

  constructor() {
    this.services = SERVICES
  }

  ngOnInit() { }
}