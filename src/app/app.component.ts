import { Component } from '@angular/core';
import { LoginPage } from '../pages/login/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
     rootPage = LoginPage;
  title = 'app';
}
