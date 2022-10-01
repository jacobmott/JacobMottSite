import { Component, OnInit } from '@angular/core';
//import { GithubService } from '../github.service';
//import {Observable} from 'rxjs';
import { DefaultService } from 'jacob-mott-site';
//import { DefaultService, MypingGet200Response } from 'jacob-mott-site';
import {HttpClient} from "@angular/common/http";



@Component({
  selector: 'app-mycarousel',
  templateUrl: './mycarousel.component.html',
  styleUrls: ['./mycarousel.component.scss']
})
export class MycarouselComponent implements OnInit {
  totalAngularPackages: any = '';
  images: any[] = [];
  //posts$!: Observable<MypingGet200Response>;
  constructor(private defaultService: DefaultService, private http:HttpClient) {
    
    this.defaultService
      .gitReposGet()
      .subscribe(console.log);

  }
  //constructor(private service: GithubService) { }

  ngOnInit(): void {
    this.http.get<any>('https://syb32bcis4.execute-api.us-east-1.amazonaws.com/prod/gitrepoimages').subscribe(data => {
      let myList = data.list;
      let images = this.images;
      myList.forEach(function (value:any) {
        images.push({'url':value.url});
      }); 
    }); 
    
    //this.posts$ = this.defaultService.mypingGet();
    //this.service.mypingGet().subscribe({
    //  next(position) {
    //    console.log('Current Position: ', position);
    //  },
    //  error(msg) {
    //    console.log('Error Getting Location: ', msg);
    //  }
    //});;
  }


}
