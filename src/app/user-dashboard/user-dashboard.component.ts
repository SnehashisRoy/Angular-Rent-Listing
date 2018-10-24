import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppData } from '../core/app-data/app-data';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  private listings: any=[];
  private dashboardSubscription : Subscription;

  constructor(private appData: AppData, private http: HttpClient) {

    this.dashboardSubscription = this.appData.listingsObs$.subscribe((listings)=>{
      this.listings = listings;
      console.log(this.listings);
    });
   }

  ngOnInit() {


    if(this.appData.listings.length == 0){
      this.http.get('http://localhost:8085/api/listings').subscribe((listings:any)=>{
        this.appData.initializeListings(listings.data);
        this.appData.getListings();
      })

    }else{
      this.appData.getListings();

    }
  }

  ngOnDestroy(){

    this.dashboardSubscription.unsubscribe();

  }

}
