import { Component } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
//import { NavController } from 'ionic-angular';
//import { DashboardPage } from '../dashboard/dashboard';
import {MovieService} from '../services/MovieService';
import {WebAccess} from '../services/WebAccess';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
import { Router } from '@angular/router';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'app-root',
  templateUrl: 'login.html',
  styleUrls: ['login.scss'],
  providers: [MovieService,WebAccess]
})


  
export class LoginPage {
    
    model = {
    left: true,
    middle: false,
    right: false
  };

  
    
    constructor(sanitizer: DomSanitizer, 
        private movieService: MovieService,private webAccess : WebAccess,private router: Router) {
        this.staticAlertClosed = true;
   
  }
    
  // response : any;
     public username :string;
     public password :string;
     public instanceUrl : string;
     public access_token : string;
     public successMessage : string;
     public  staticAlertClosed : boolean ;
     alertMessage='';
   


 

  performLogin(){
      
      console.log("Clicked "+this.username+" password "+this.password);
      if(this.username==undefined){
          this.staticAlertClosed = false;
          this.alertMessage="Please enter valid username!";
          return;
      }
      
      this.webAccess.performLogin().subscribe(
      data => {
          console.log(data);
          this.router.navigateByUrl('/dashboard');
      },
      err=>{
          console.log(err);
      })
       
        /*this.movieService.performLogin(this.login['username'],this.login['password']).subscribe(
				data => {
					//this.movies = data.results; 
					console.log(JSON.parse(data['_body'])['access_token']);
                                        
                                        
                                        let response = JSON.parse(data['_body']);
                                        if(response['access_token']){
                                            
                                            this.instanceUrl = response['instance_url'];
                                            this.access_token = response['access_token'];
                                           // this.storage.set('login_data', data['_body']);
                                            
                                            //this.navCtrl.push(DashboardPage);
                                        }
                                        //response = data.json();
                                        //
                                        //alert("Response "+JSON.stringify(data))
                                       // this.loadProfile();
                                        
                                        
				},
				err => {
					console.log(err);
                                        //alert("Response error "+err)
                                        alert("Invalid Credentials!");
				},
				() => console.log('Login  Complete')
			);*/
        
  }
  
  /*loadProfile(){
      
       let url  =this.instanceUrl+"/services/apexrest/UserInterface?page=UserDetails";
        this.movieService.getEventList(url,this.access_token).subscribe(
				data => {
					//this.movies = data.results; 
					console.log(JSON.parse(data['_body']));
                                        this.storage.set('user_data', data['_body']);
                                        this.navCtrl.push(DashboardPage);
				},
				err => {
					console.log(err);
                                        //alert("Response error "+err)
                                        alert("Unable to load ! "+err);
				},
				() => console.log('Event load Complete')
			);
                        
      
      
  }*/
  
  
  
  
  
  /*
  submitLogin(){
      
        var propertiesURL = 'http://lexemacro.com/MY_API/api.php?action=login&username=aniruddhambarkar@gmail.com&password=test';
        
        var response = this.http.get(propertiesURL)
            .map(res => res.json())
            .catch(this.handleError);
        
  }
  
  handleError(error) {
        console.error(error);
        alert("error "+error);
        return Observable.throw(error.json().error || 'Server error');
    }*/
  

}
