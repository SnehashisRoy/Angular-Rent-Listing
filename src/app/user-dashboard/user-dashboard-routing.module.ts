import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';

const routes: Routes = [
  {path:'', component: UserDashboardComponent},
  {path:'listing/:id', component: EditListingComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
