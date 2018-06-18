
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from '../pages/login/login';

const appRoutes: Routes = [
    
    { path: 'login', component: LoginPage }
    
];

export const APP_ROUTES: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
