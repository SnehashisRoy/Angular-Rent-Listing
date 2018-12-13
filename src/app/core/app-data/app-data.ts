import{Observable, Subject} from 'rxjs';

export class AppData{

    public listings: any = [] ;
    private listingsSource = new Subject<any>();

    listingsObs$ = this.listingsSource.asObservable();


    initializeListings(listings:any){

        this.listings = listings;
        
        
    }

    getListings(){
        this.listingsSource.next(this.listings.slice(0));

    }

    updateListings(listing:any){
        this.listings = this.listings.map(function(el){
            if(el.id == listing.id){
                return listing;
            }
            return el;
        });

    }

    addListing(listing:any){
         this.listings.push(listing);
        console.log(this.listings);

    }


    

    
   








}