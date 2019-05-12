import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
 
const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'auth', loadChildren:'./authentication/authentication.module#AuthenticationModule'},
  { path: 'dashboard', loadChildren:'./user-dashboard/user-dashboard.module#UserDashboardModule'}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}