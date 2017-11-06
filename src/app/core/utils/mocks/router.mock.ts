import { NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export class MockRouter {
  public ne = new NavigationEnd(
    0,
    null,
    null
  );

  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });

  public navigate(urls: any[]) { return true; }

  subscribe() {}
  isRouteActive() {}
  generate() {}
}
