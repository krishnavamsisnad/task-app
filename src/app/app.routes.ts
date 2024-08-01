import { RouterModule, Routes } from '@angular/router';
import { CounterAppComponent } from './counter-app/counter-app.component';
import { WheaterAppComponent } from './wheater-app/wheater-app.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [

    {path:'counter', component:CounterAppComponent},
    {path:'wheater', component:WheaterAppComponent}

];
NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }