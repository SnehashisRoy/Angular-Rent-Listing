import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
 
const appRoutes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //{ path: 'sign-up', component:  SignUpComponent},
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes', component: HeroesComponent }
  { path: 'sign-up', loadChildren:'./authentication/authentication.module#AuthenticationModule'}
];
 
@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}