import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WebAccess{
    

    
    
    constructor (private http: Http
  ) {}
    
   serverURL : string = "http://localhost:8080/";
   public login: string =this.serverURL+"/adminLogin?";
   public adminlogin: string =this.serverURL+"/adminLogin?";
   public getAllUsers : string = this.serverURL+"getAllUsers";
  
   getUser() {
    return this.http.get(`https://conduit.productionready.io/api/profiles/eric`)
    .map((res:Response) => res.json());
  }
  
  performLogin(){
          var data = "username=test&password=test";
          return this.http.get(this.adminlogin,data);
      
  }

  getUsers(){
    return this.http.get(this.getAllUsers);
  }
  
}