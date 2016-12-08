import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_FLOWS_URL, API_SERVICES_URL } from './../constants';
import { FlowData, StepData, Service } from './../models';

@Injectable()
export class FlowsApiService {
  constructor(private http: Http) {}

  fetchFlow(flowId: number): Observable<FlowData> {
    return this.get(`${API_FLOWS_URL}/${flowId}`);
  }

  updateFlow(flowId: number, data: FlowData): Observable<FlowData> {
    return this.patch(`${API_FLOWS_URL}/${flowId}`, data);
  }

  updateFlowStep(flowId: number, stepId: number, data: StepData): Observable<StepData> {
    console.log('PATCH step data', data);
    return this.patch(`${API_FLOWS_URL}/${flowId}/steps/${stepId}`, data);
  }

  fetchServices(): Observable<Service[]> {
    return this.get(`${API_SERVICES_URL}`);
  }

  private get(url: string): Observable<any> {
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  private post(url: string, data: any): Observable<any> {
    return this.http.post(url, data, this.createOptions())
      .map((res: Response) => res.json());
  }

  private put(url: string, data: any): Observable<any> {
    return this.http.put(url, data, this.createOptions())
      .map((res: Response) => res.json());
  }

  private patch(url: string, data: any): Observable<any> {
    return this.http.patch(url, data, this.createOptions())
      .map((res: Response) => res.json());
  }

  private createOptions(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }
}
