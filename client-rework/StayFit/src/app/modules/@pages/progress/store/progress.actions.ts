import { createHTTPActions } from "src/app/modules/@core/utility/store-actions.helper";

import { Measurement } from "../models/measurement.model";

export const [createMeasurement,createMeasurementSuccess,createMeasurementFailure] =
createHTTPActions<{data:any},{addedCount:number},{error?:string}>('[progress] add measurement');

export const [editMeasurementById,editMeasurementByIdSuccess,editMeasurementByIdFailure] =
createHTTPActions<{measurementId:string,data:any},{id:string}>('[progress] edit measurement by id');

export const [loadMeasurements,loadMeasurementsSuccess,loadMeasurementsFailure] =
createHTTPActions<{},{measurements:Measurement[]}>('[progress] load measurements');

export const [loadMeasurementById,loadMeasurementByIdSuccess,loadMeasurementByIdFailure] =
createHTTPActions<{measurementId:string},{measurement:Measurement},{}>('[progress] load measurement by id');

export const [deleteMeasurement,deleteMeasurementSuccess,deleteMeasurementFailure] =
createHTTPActions<{measurementId:string},{measurementId:string},{}>('[progress] delete measurement');