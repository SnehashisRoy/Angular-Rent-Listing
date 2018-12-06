import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule }    from '@angular/common/http';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { ListingsService } from '../core/services/listings.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    UserDashboardRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserDashboardComponent, EditListingComponent, UploadImagesComponent],
  providers:[ListingsService]
})
export class UserDashboardModule { }
