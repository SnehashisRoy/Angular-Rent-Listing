import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ListingsService } from 'src/app/core/services/listings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from , Subscription } from 'rxjs';
import { filter, flatMap} from 'rxjs/operators';
import { AppData } from 'src/app/core/app-data/app-data';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  private step:number = 1;
  private listing:any;
  public  listingStepOne: FormGroup;
  public  listingStepTwo: FormGroup;
  public  listingStepThree: FormGroup;
  private listingSubscription: Subscription;


  

  constructor(private listingService: ListingsService,
              private route: ActivatedRoute,
              private appData: AppData,
              private router: Router) {
               
               }

  ngOnInit() {

    // for reloading the component data on change url parameter
    this.route.params.subscribe(res =>{


      this.listing = null;
      // unsuscribe to the old subscription on changing the param
      if(this.listingSubscription){
        this.listingSubscription.unsubscribe();
      }

      // if(res['id'] == 'new'){
      //   return;
      // }
      this.listingSubscription =  this.appData.listingsObs$.pipe(
        flatMap((v)=>{
          return from(v);
        }),
        filter((v)=>{
          return v['id'] == res['id'];
        })
  
      )
      .subscribe((listing)=>{
        this.listing = listing;
      }
      );
      this.listingStepOne = new FormGroup({
        title:new FormControl (  this.listing ? this.listing.title: '' , Validators.required),
        address :new FormControl(  this.listing ? this.listing.address: '' , Validators.required),
        city :new FormControl( this.listing ? this.listing.city: '' , Validators.required),
        postal :new FormControl( this.listing ? this.listing.postal: '' , Validators.required),
      });
  
      this.listingStepTwo = new FormGroup({
        description :new FormControl( this.listing ? this.listing.description: '' , Validators.required),
        type :new FormControl( this.listing ? this.listing.type: '' , Validators.required),
        bedrooms :new FormControl( this.listing ? this.listing.bedrooms: '' , Validators.required),
        bathrooms :new FormControl( this.listing ? this.listing.bathrooms: '' , Validators.required),
      });
  
      this.listingStepThree = new FormGroup({
        furnished :new FormControl(this.listing ? this.listing.furnished: ''),
        pet_friendly :new FormControl( this.listing ? this.listing.pet_friendly: ''),
        parking :new FormControl(this.listing ? this.listing.parking: ''),
        size :new FormControl( this.listing ? this.listing.size: '' ),
        price :new FormControl( this.listing ? this.listing.price: '' , Validators.required),
      });
  

    }
      
      
      
      );
   
   

  }

  get title() { return this.listingStepOne.get('title'); }
  get address() { return this.listingStepOne.get('address'); }
  get description() { return this.listingStepTwo.get('description'); }
  get city() { return this.listingStepOne.get('city'); }
  get postal() { return this.listingStepOne.get('postal'); }
  get type() { return this.listingStepTwo.get('type'); }
  get bedrooms() { return this.listingStepTwo.get('bedrooms'); }
  get bathrooms() { return this.listingStepTwo.get('bathrooms'); }
  get price() { return this.listingStepThree.get('price'); }
  

  onSubmitStepOne(step: number){
   
    if(this.listing){
      this.listingService.updateListing(this.listing.id, this.listingStepOne.value).subscribe(
        (listing:any) => {
              this.listing = listing.data;
              this.appData.updateListings(listing.data);
              this.step = 2;
      
            },
            err => console.log(err)
      )
    }else{
     
      if(!this.listingStepOne.valid){
        return;
      }
      this.listingService.createListing(this.listingStepOne.value).subscribe(
        (listing:any) => {
              this.listing = listing;
              this.appData.addListing(listing);
              this.step = 2;
              this.router.navigate(['/dashboard/listing/edit', this.listing.id])
      
            },
            err => console.log(err)
      )
    }
    
  }

  onSubmitStepTwo(step:number){
    
    if(!this.listing){
      this.step = 1;
      return;
    }
    this.listingService.updateListing(this.listing.id, this.listingStepTwo.value).subscribe(
      (listing:any) => {
            this.listing = listing.data;
            this.appData.updateListings(listing.data);
            this.step = 3;
    
          },
          err => console.log(err)
    )
  }

  onSubmitStepThree(step:number){
    if(!this.listing){
      this.step = 1;
      return;
    }

    this.listingService.updateListing(this.listing.id, this.listingStepThree.value).subscribe(
      (listing:any) => {
          
            this.listing = listing.data;
            console.log(this.listing);
            this.appData.updateListings(listing.data);
            this.step = 4;
            //this.router.navigate(['/dashboard/listing/upload', this.listing.id])
    
          },
          err => console.log(err)
    )

  }

  ngOnDestroy(){
      this.listingSubscription.unsubscribe();

    
   }


}
