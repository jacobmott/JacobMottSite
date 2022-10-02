import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private dataTransferSubject = new Subject<any>();
  dataTransferObservable = this.dataTransferSubject.asObservable();


  constructor() { }

  push(repo: any) {
    this.dataTransferSubject.next(repo);
  }



}
