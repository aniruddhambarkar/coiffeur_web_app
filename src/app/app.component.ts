import { Component } from '@angular/core';
import { LoginPage } from '../pages/login/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
     rootPage = LoginPage;
  title = 'app';

  constructor(private router : Router){

  }

  isActive(currentRoute: any[], exact = true): boolean {
       
    return this.router.isActive(this.router.createUrlTree(currentRoute), exact);
}

}
