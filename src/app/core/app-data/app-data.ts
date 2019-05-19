import{Observable,  BehaviorSubject} from 'rxjs';

export class AppData{

    //public listings: any = [] ;
    private listingsSource = new BehaviorSubject<any>([]);

    listingsObs$ = this.listingsSource.asObservable();

    updateToDate(data){
        this.listingsSource.next(data);

    }


    

    // getListings(){
    //     this.listingsSource.next(this.listings.slice(0));

    // }

    updateListings(listing:any){
        let data = this.listingsSource.value.map(function(el){
            if(el.id == listing.id){
                return listing;
            }
            return el;
        });

        

    }

    addListing(listing:any){
        let data = this.listingsSource.value.push(listing);
        this.listingsSource.next(data);


    }


    

    
   








}