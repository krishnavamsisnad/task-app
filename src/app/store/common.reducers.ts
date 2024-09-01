import { createReducer, on } from "@ngrx/store";
import * as commonactions from './common.actions';
import { Counter } from "../chatmodel";
import { CoungterActions } from './common.actions';


export interface State{
    counters: Counter[];
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
  weatherdata: [],
  selectedCity: '',
  cities_data: [],
  error: null,
  counters: []
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
    ))

    export const counterReducer = createReducer(
      initialState,
      on(CoungterActions.addCounter, (state, { counter }) => ({
        ...state,
        counters: [...state.counters, counter]
      })),
      on(CoungterActions.incrementCounter, (state, { id }) => ({
        ...state,
        counters: state.counters.map(counter =>
          counter.id === id ? { ...counter, count: counter.count + 1 } : counter
        )
      })),
      on(CoungterActions.decrementCounter, (state, { id }) => ({
        ...state,
        counters: state.counters.map(counter =>
          counter.id === id && counter.count > 0 ? { ...counter, count: counter.count - 1 } : counter
        )
      })),
      on(CoungterActions.deleteCounter, (state, { id }) => ({
        ...state,
        counters: state.counters.filter(counter => counter.id !== id)
      })),
      on(CoungterActions.resetCounter, state => ({
        ...state,
        counters: []
      }))
    );
    

