import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { CreateListingComponent } from './create-listing/create-listing.component';

const routes: Routes = [
  {path:'', component: UserDashboardComponent},
  //{path:'listing/:id', component: EditListingComponent},
  //{path:'listing/upload/:id', component: UploadImagesComponent},
  {path:'listing/edit/:id', component: CreateListingComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
