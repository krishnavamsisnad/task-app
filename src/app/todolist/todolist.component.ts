import { Component, OnInit } from '@angular/core';
import { PraticualrService } from '../praticualr.service';
import { Observable, Subscription } from 'rxjs';
import { List } from '../chatmodel';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit {
      reciviceddata!:number
    listdats$!:Observable<List[]>
      listform!:FormGroup
      subiction!:Subscription

   constructor(public tolist:PraticualrService, public fb:FormBuilder){}

ngOnInit(): void {
  this.listdats$=this.tolist.passingdata$
  this.intinationsfrom()
  this.subiction=this.tolist.pasingsdata$.subscribe((va)=> {
    this.reciviceddata=va
  })
}

intinationsfrom(){
  this.listform=this.fb.group({
    data:[null,Validators.required]
  })
}
addData(): void {
  if (this.listform.valid) {
    const datanew = this.tolist.passingdata$.value;
    const newItem = {
      
      employename: this.listform.get('data')?.value || ''
    };
  const updatedData = [...datanew, newItem];
   this.tolist.passingdata$.next(updatedData);
  // this.tolist.listdata.update((value)=>[...datanew,newItem])
    this.listform.reset();
  }

}

deletrow(i: number) {
  const datanew = this.tolist.passingdata$.value;
  datanew.splice(i, 1); 
  this.tolist.passingdata$.next([...datanew]); 
  this.listform.reset();
}


}

