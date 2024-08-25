import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, single, switchMap } from 'rxjs';
import { environment } from './environment/environment';
import { Counter, Message } from './chatmodel';

@Injectable({
  providedIn: 'root'
})
export class WeatherrserivcesService {
   
  private apiKey = environment.apiKey;
  private apiUrl = environment.ApiUrl;
  counter_data = signal<Counter[]>([]);
  cities_data = signal<any[]>([]);
  send_message = signal<Message[]>([])

  constructor(public http:HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/weather?q=${city}&appid=${this.apiKey}`);
  }

  getForecast(lat:number, log:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/forecast?lat=${lat}&lon=${log}&cnt=5&appid=${this.apiKey}`);
  }

  getCityForecast(city:string){
    return this.getWeather(city).pipe(
      switchMap((res:any) => {
        if(res && res.name.toLowerCase() === res.name.toLowerCase()){
          return this.getForecast(res.coord.lat, res.coord.lon)
        } else {
          return EMPTY
        }
      })
    )
  }
}
