import { Component, OnDestroy } from '@angular/core';
import { CoreStateService } from '../../../core/services';
import { Subscription  } from 'rxjs/Subscription';

@Component({
  selector: 'api-info',
  templateUrl: 'api-info.component.html',
  styleUrls: ['api-info.component.css']
})
export class ApiInfoComponent implements OnDestroy {
  loadingInfo: boolean = false;
  infoQuerySub: Subscription;
  info = {};

  constructor(public state: CoreStateService) {
    this.loadingInfo = true;
    this.infoQuerySub = this.state
      .getApiInfo()
      .subscribe(this.onLoadInfo.bind(this), err => console.log(err));
  }

  onLoadInfo(info) {
    this.info = info;
    this.loadingInfo = false;
  }

  ngOnDestroy() {
    this.infoQuerySub.unsubscribe();
  }
}
