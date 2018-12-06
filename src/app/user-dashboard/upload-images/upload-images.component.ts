import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppData } from 'src/app/core/app-data/app-data';
import { from, Subscription} from 'rxjs';
import { filter, flatMap} from 'rxjs/operators';
import { ListingsService } from 'src/app/core/services/listings.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

  public uploadImages:FormGroup;

  private files: any = {};

  private listing: any ;

  private lsitingSubscription: Subscription;

  constructor(private http: HttpClient,
              private route: ActivatedRoute, 
              private listingService: ListingsService, 
              private appData: AppData) {

    this.lsitingSubscription =  this.appData.listingsObs$.pipe(
      flatMap ((v)=>{
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
    this.uploadImages = new FormGroup({

      images : new FormArray([])

    });

  }

  get images(){
    return this.uploadImages.get('images') as FormArray;
  }

  onAddImage(){
    const control = new FormControl(null);
    this.images.push(control);


  }

  removeImage(id: number){

    this.listingService.deleteImage(id).subscribe(
      (listing:any) => {
        this.listing = listing.data;
       this.appData.updateListings(listing.data);
     }, 
     err => console.log(err)

    )


  }
  onRemoveImage(i){

    this.images.removeAt(i);
    delete this.files[i];
    console.log(this.files);


  }
  onSelectEvent(event, i ) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      
  
      reader.onload = () => {

        this.files[i] = reader.result;

        console.log(this.files);
        
      
        // need to run CD since file load runs outside of zone
      };
    }
  }
  onSubmit(){
    // manually attaching the image data to the input variable
    this.uploadImages.value['images']= Object.values(this.files); // converting object to array
    
    this.listingService.uploadImages(this.route.snapshot.params.id,this.uploadImages.value ).subscribe(
        (listing:any) => {
         this.listing = listing.data;
        this.appData.updateListings(listing.data);
      }, 
      err => console.log(err)
    )


  }

  ngOnDestroy(){
    this.lsitingSubscription.unsubscribe();
 
   }
 

}
