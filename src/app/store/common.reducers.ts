import { createReducer, on } from "@ngrx/store";
import * as commonactions from './common.actions';


export interface State{
    cityName: string;
    errorMessage: string;
    weatherdata:any[];
    selectedCity: any;
    cities_data: any[];
    error:any;
}

export const initialState:State={
    cityName: '',
    errorMessage: '',
    weatherdata:[],
    selectedCity:'',
    cities_data: [],
    error: null
}

const modifyCitiesData = (data:any[]) => {
    if (data.length >= 8) {
        data.pop();
      }
      return data;
}



export const commonReducer= createReducer(
    initialState,
    on(
      commonactions.WeatherActions.getCityWeatherDataSuccess, (state, {data}): State => ({
        ...state,
        cities_data: modifyCitiesData(state.cities_data),
        selectedCity:data,
        cityName: '',
        errorMessage: '',
        error:null
      })),
    on(
        commonactions.WeatherActions.getCityWeatherDataFaliure, (state, {error}): State => ({
            ...state,
            error: error,
            errorMessage: 'City not found',
          })
    ),

    )
