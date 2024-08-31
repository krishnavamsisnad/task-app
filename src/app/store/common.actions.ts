import { HttpErrorResponse } from "@angular/common/http";
import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const WeatherActions=createActionGroup(
    {
        source:'Weather Data',
        events:{
            'Get City Weather Data':props<{city:string}>(),
            'Get City Weather Data Success':props<{data:any}>(),
            'Get City Weather Data Faliure':props<{error:HttpErrorResponse}>(),
            'Get City Forecast Data':props<{payload:any}>(),
            'Get City Forecast Data Succes':props<{data:any}>(),
            'Get City Forecast Data Faliure':props<{error:HttpErrorResponse}>(),
            'Delete City Data':props<{payload:any}>(),
            'Clear City Data':emptyProps(),
            'Search City Data':props<{payload:any}>(),
        }
    }
)