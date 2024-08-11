  export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface Main {
    temp: number;
    pressure: number;
  }
  
 export interface Wind {
    speed: number;
    deg: number;
  }
  
 export interface ForecastListItem {
    dt_txt: string;
    weather: Weather[];
    main: Main;
    wind: Wind;
  }
  
 export interface Forecast {
    list: ForecastListItem[];
  }
  
   