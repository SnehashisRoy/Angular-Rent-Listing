import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppData } from '../core/app-data/app-data';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  private listings: any=[];
  private dashboardSubscription : Subscription;
  

  constructor(private appData: AppData, private http: HttpClient) {}

  ngOnInit() {

    this.dashboardSubscription = this.appData.listingsObs$.subscribe((listings)=>{
      this.listings = listings;


      if(this.listings.length == 0){
        this.http.get(environment.apiUrl +'api/listings').subscribe((listings:any)=>{
          this.listings = listings;
          this.appData.updateListings(listings); //update app data
        });
      }
  

    });
  }


  ngOnDestroy(){

    this.dashboardSubscription.unsubscribe();

  }

}
