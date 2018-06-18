import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers, RequestOptions} from '@angular/http';
 import { HttpModule } from '@angular/http';
 
export class MovieService {  
    static get parameters() {
        return [[Http]];
    }
 
	constructor(private http:Http) {
		
	}
 
    searchMovies(movieName) {
        var url = 'http://lexemacro.com/MY_API/api.php?action=login&username=aniruddhambarkar@gmail.com&password=test';
        var response = this.http.get(url).map(res => res.json());
		return response;
    }
    
    performLogin(username,password){
            
            let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
		let options = new RequestOptions({
			headers: headers
		});
            
            let data = "grant_type=password&client_id=3MVG9Y6d_Btp4xp5mgy7hBfhCbLJvklGIyWd8HTugZxdapc3XwF_5KjfVVlmRHrjudskiG6ynkj9u4Qyha7oQ&"+
                    "client_secret=8497021862051509052&username="+username+"&password="+password;
                    
                    console.log("Request data "+data);
                    
            return this.http.post("https://login.salesforce.com/services/oauth2/token", data,options);
            
    }
    
    getEventList(url,authToken){
        
       // let authHeader = 'Authorization': "Bearer +authToken; 
           
        let headers = new Headers({});
        
        headers.append("Authorization", "Bearer "+authToken);
        //headers.append("Content-Type","application/json; charset=utf8");
        /*
		let options = new RequestOptions({
			//headers: headers
		});*/
                
                 let options = new RequestOptions({ headers: headers, body: '{}' });
                
            //console.log("header "+authHeader);
            
            let data = "{}";
                    
                    console.log("Request data "+data+" "+JSON.stringify(options));
                    
            return this.http.get(url,options);
        
    }
}