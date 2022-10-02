import { Component, OnInit } from '@angular/core';
//import { GithubService } from '../github.service';
//import {Observable} from 'rxjs';
import { DefaultService } from 'jacob-mott-site';
//import { DefaultService, MypingGet200Response } from 'jacob-mott-site';
import {HttpClient} from "@angular/common/http";
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-mycarousel',
  templateUrl: './mycarousel.component.html',
  styleUrls: ['./mycarousel.component.scss']
})
export class MycarouselComponent implements OnInit {


  currentRepo: any;
  images: any[] = [];
  //posts$!: Observable<MypingGet200Response>;
  constructor(private defaultService: DefaultService, private sharedService: SharedService, private http:HttpClient) {
    
    this.defaultService
      .gitReposGet()
      .subscribe(console.log);

  }
  //constructor(private service: GithubService) { }


  onRepoChanged(repo:any) {
    this.currentRepo = repo;
    console.log("THIS IS CAROUSEL! I GOT THE REPO CHANGE: "+repo.name);
    this.http.get<any>('https://syb32bcis4.execute-api.us-east-1.amazonaws.com/prod/gitrepoimages?repoName='+this.currentRepo.name).subscribe(data => {
      this.images = [];
      let myList = data.list;
      let images = this.images;
      myList.forEach(function (value:any) {
        images.push({'url':value.url});
      }); 
    });     

  }

  ngOnInit(): void {

    this.sharedService.dataTransferObservable.subscribe(repo => {
      this.onRepoChanged(repo);
    })
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

  //over() {
  //  console.log("Mouseover event called");
  //  //apply zoom-in logic here
  //}
  //out() {
  //  console.log("Mouseout event called");
  //  //apply zoom-out logic here
  //}
}
