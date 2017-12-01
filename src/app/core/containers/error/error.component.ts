import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'error.component.html',
  styleUrls: ['error.component.css']
})
export class ErrorComponent {
  entities = {
    account: {
      sing: 'account',
      plur: 'accounts',
      capSing: 'Account',
      capPlur: 'Accounts',
      returnRoute: 'accounts'
    },
    task: {
      sing: 'task',
      plur: 'tasks',
      capSing: 'Task',
      capPlur: 'Tasks',
      returnRoute: 'tasks'
    },
    flow: {
      sing: 'flow',
      plur: 'flows',
      capSing: 'Flow',
      capPlur: 'Flows',
      returnRoute: 'flows'
    }
  };

  code: string;
  entityType: string;

  constructor(public route: ActivatedRoute, public router: Router) {
    this.code = this.route.snapshot.params.code;
    this.entityType = this.route.snapshot.params.entity;
  }

  message() {
    console.log('this.entityType', this.entityType);
    switch (parseInt(this.code, 10)) {
      case 401:
        return `You don't have permission to access this ${
          this.entities[this.entityType].sing
        }`;

      case 404:
        return `${this.entities[this.entityType].capSing} not found`;

      default:
        break;
    }
  }

  return() {
    this.router.navigate([this.entities[this.entityType].returnRoute]);
  }
}
