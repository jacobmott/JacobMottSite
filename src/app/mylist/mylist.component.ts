import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.scss']
})
export class MylistComponent implements OnInit {

  classStyle!: boolean;
  repos: any = [];
  currentRepo: string = "ARTBlenderLowPolyCharacters";


  constructor(private sharedService: SharedService, private http:HttpClient) { }

  ngOnInit(): void {

    this.http.get<any>('https://syb32bcis4.execute-api.us-east-1.amazonaws.com/prod/gitRepos').subscribe(data => {
      let myList = data.list;
      let repos = this.repos;
      myList.forEach(function (value:any) {
        repos.push({'name':value.name});
      });
      this.sharedService.push({name: this.currentRepo});
    }); 


    setInterval(() =>{
      this.classStyle = !this.classStyle;
    }, 1000);

    this.classStyle = true;


  }

  getClassStyle(repo: any, negativeCheck: boolean){
    if (this.currentRepo !== repo.name && negativeCheck){
      return true;
    }
    if (this.currentRepo !== repo.name && !negativeCheck){
      return false;
    }
    else{
      return this.classStyle;
    }

  }

  onRowClicked(event: any, repo: any){
    this.currentRepo = repo.name;
    this.sharedService.push(repo);
  }



}
