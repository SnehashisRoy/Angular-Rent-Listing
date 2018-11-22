import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppData } from 'src/app/core/app-data/app-data';
import { filter, flatMap} from 'rxjs/operators';
import { from, Subscription} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit, OnDestroy {

  private listing: any;
  private lsitingSubscription: Subscription;
  public editListing: FormGroup;

  


  constructor(private appData: AppData, 
              private route: ActivatedRoute,
              private http: HttpClient) {

   this.lsitingSubscription =  this.appData.listingsObs$.pipe(
      flatMap((v)=>{
        return from(v);
      }),
      filter((v)=>{return v['id'] == route.snapshot.params.id})

    )
    .subscribe((listing)=>{
      this.listing = listing;
      console.log(this.listing);
    }
    );
   }

  

  ngOnInit() {
    this.appData.getListings();
    this.editListing = new FormGroup({
      title:new FormControl( this.listing.title , Validators.required),
      address :new FormControl( this.listing.address , Validators.required),
      city :new FormControl( this.listing.city , Validators.required),
      postal :new FormControl( this.listing.postal , Validators.required),
      description :new FormControl( this.listing.description , Validators.required),
      type :new FormControl( this.listing.type , Validators.required),
      bedrooms :new FormControl( this.listing.bedrooms , Validators.required),
      bathrooms :new FormControl( this.listing.bathrooms , Validators.required),
      furnished :new FormControl( this.listing.furnished),
      pet_friendly :new FormControl( this.listing.pet_friendly),
      parking :new FormControl( this.listing.parking),
      size :new FormControl( this.listing.size ),
      price :new FormControl( this.listing.price , Validators.required),
      //highlights : new FormArray([])
  
    });

    
    // initialize with database value
  //   this.listing.highlights.map((v)=>{

  //     (<FormArray>this.editListing.get('highlights')).push(
  //       new FormGroup({
  //       'highlight': new FormControl(null),
  //       'detail': new FormControl(null)
  //   })
  //   )

  //   })
    
  }



  onSubmit(){
    console.log(this.editListing);
    this.http.post('http://localhost:8085/api/listing/'+ this.route.snapshot.params.id, this.editListing.value).subscribe(
      (listing:any) => {
        this.listing = listing.data;
        this.appData.updateListings(listing.data);

      });

  }
  // onAddHighlights(){
  //   const control = new FormGroup({
  //     'highlight': new FormControl(null),
  //     'detail': new FormControl(null)
  // });
  //   (<FormArray>this.editListing.get('highlights')).push(control);

  // }

  get title() { return this.editListing.get('title'); }
  get address() { return this.editListing.get('address'); }
  get description() { return this.editListing.get('description'); }
  get city() { return this.editListing.get('city'); }
  get postal() { return this.editListing.get('postal'); }
  get type() { return this.editListing.get('postal'); }
  get bedrooms() { return this.editListing.get('bedrooms'); }
  get bathrooms() { return this.editListing.get('bathrooms'); }
  get price() { return this.editListing.get('price'); }


  ngOnDestroy(){
   this.lsitingSubscription.unsubscribe();

  }

  
 
  

}
