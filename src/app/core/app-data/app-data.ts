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

    

    
   








}