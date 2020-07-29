import { HttpClient, HttpHeaders,HttpHeaderResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AcessProviders {
       server : string = 'https://egab.app/api/'
      
       constructor(
         public http : HttpClient
      ) { }
      
      postData(body, file){
         let headers = new HttpHeaders({
                 'Content-Type':'aplication/json; charset-UTF-8'
         });
         let options = {
             headers : headers
         }

      

      return this.http.post(this.server + file, JSON.stringify(body),options)
      .timeout(59000) // 59sc timeout
      .map(res => res);
        }
}
