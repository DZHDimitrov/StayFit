import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Measurement } from "src/app/modules/@pages/progress/models/measurement.model";
import { IApiResponse } from "../../interfaces/api.response";
import { ProgressApi } from "../api/progress.api";

@Injectable()
export class ProgressService {
    constructor(private api:ProgressApi) {}

    createMeasurement(data:any):Observable<IApiResponse<number>> {
        return this.api.createMeasurement(data);
    }

    editMeasurementById(measurementId:string,data:any):Observable<IApiResponse<string>> {
        return this.api.editMeasurementById(measurementId,data);
    }

    loadMeasurements():Observable<IApiResponse<Measurement[]>> {
        return this.api.loadMeasurements();
    }

    loadMeasurementById(measurementId:string):Observable<IApiResponse<Measurement>> {
        return this.api.loadMeasurementById(measurementId);
    }

    deleteMeasurement(measurementId:string) {
        return this.api.deleteMeasurement(measurementId);
    }
}