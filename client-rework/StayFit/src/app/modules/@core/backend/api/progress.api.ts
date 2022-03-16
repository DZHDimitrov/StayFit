import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../interfaces/api.response';
import { Measurement } from 'src/app/modules/@pages/progress/models/measurement.model';

@Injectable()
export class ProgressApi {
  private readonly apiController = 'progress';

  constructor(private api: HttpService) {}

  createMeasurement(data: any): Observable<IApiResponse<number>> {
    return this.api.post(`${this.apiController}`, data);
  }

  editMeasurementById(measurementId:string,data:any):Observable<IApiResponse<string>> {
    return this.api.put(`${this.apiController}/${measurementId}`,data);
  }

  loadMeasurements():Observable<IApiResponse<Measurement[]>> {
    return this.api.get(`${this.apiController}`);
  }

  loadMeasurementById(measurementId:string):Observable<IApiResponse<Measurement>> {
    return this.api.get(`${this.apiController}/${measurementId}`);
  }
  
  deleteMeasurement(measurementId:string){
    return this.api.delete(`${this.apiController}/${measurementId}`);
  }
}
