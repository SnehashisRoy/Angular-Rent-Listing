import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppData } from 'src/app/core/app-data/app-data';
import { filter, flatMap} from 'rxjs/operators';
import { from, Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit, OnDestroy {

  private listing: any;
  private lsitingSubscription: Subscription;

  constructor(private appData: AppData, private route: ActivatedRoute) {

   this.lsitingSubscription =  this.appData.listingsObs$.pipe(
      flatMap((v)=>{
        return from(v);
      }),
      filter((v)=>{return v.id == route.snapshot.params.id})

    )
    .subscribe((listing)=>{
      this.listing = listing;
      console.log(this.listing);
    }
    );
   }

  ngOnInit() {
    this.appData.getListings();
  }
  ngOnDestroy(){
   this.lsitingSubscription.unsubscribe();

  }

  
 
  

}
