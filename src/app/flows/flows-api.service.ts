import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_FLOWS_URL, API_SERVICES_URL } from './constants';
import { FlowData, Service } from './models';

export interface RequestArgs {
  method: RequestMethod;
  search: string;
  url: string;
}

export interface RequestOptions {
  method?: RequestMethod;
  paginate?: boolean;
  query?: string;
  url: string;
}

@Injectable()
export class FlowsApiService {
  constructor(private http: Http) {}

  fetch(url: string): Observable<any> {
    return this.request({url});
  }

  fetchFlow(flowId: number): Observable<FlowData> {
    return this.request({
      url: `${API_FLOWS_URL}/${flowId}`
    });
  }

  fetchServices(): Observable<Service[]> {
    return this.request({
      url: `${API_SERVICES_URL}`
    });
  }

  request(options: RequestOptions): Observable<any> {
    const req: Request = new Request(this.requestArgs(options));
    return this.http.request(req)
      .map((res: Response) => res.json());
  }

  requestArgs(options: RequestOptions): RequestArgs {
    const { method, paginate, query, url } = options;
    let search: string[] = [];

    if (query) search.push(query);

    return {
      method: method || RequestMethod.Get,
      search: search.join('&'),
      url
    };
  }
}
