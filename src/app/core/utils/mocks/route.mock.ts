import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

export class MockRoute {
  public children = [
    {
      params: Observable.of({ id: 123 }),
      snapshot: { url: [ { path: '' } ] }
    }
  ];
  public params = Observable.of({ id: 123 });
}
