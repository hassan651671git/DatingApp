import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-values',
  templateUrl: './values.component.html',
  styleUrls: ['./values.component.css']
})
export class ValuesComponent implements OnInit {

  values: any;
  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
this.httpClient.get('http://localhost:5000/Values/get').subscribe(
(data)=>{
this.values=data;
},
(error)=>{
console.log(error);
}
);
  }

}
