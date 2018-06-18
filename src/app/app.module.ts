import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from '../pages/login/login';
import { APP_ROUTES } from './app.routing';

import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AppRoutingModule } from './/app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkTableModule} from '@angular/cdk/table';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardPage} from '../pages/dashboard/dashboard';
import {Ng2TableModule} from 'ng2-table'
    

const appRoutes: Routes = [
  { path: '', component: LoginPage },
  { path: 'dashboard', component: DashboardPage }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    LoginComponentComponent,
    DashboardPage,
    
    
  ],
  imports: [
    BrowserModule,
    NgbModule,
    //modules,
    Ng2TableModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true} // <-- debugging purposes only
    ),    
    AppRoutingModule,    
    
    FormsModule ,
    ReactiveFormsModule,
NgbModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  providers: [],  
  entryComponents: [    
    LoginPage
  ]
})


@NgModule({
  exports: [
    
  ]
})


export class AppModule { }
