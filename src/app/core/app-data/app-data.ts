import{Observable,  BehaviorSubject} from 'rxjs';

export class AppData{

    // store listings

    private listingsSource = new BehaviorSubject<any>([]);

    listingsObs$ = this.listingsSource.asObservable();


    updateListings(listing:any){

        if(Array.isArray(listing)){
            this.listingsSource.next(listing);
            return;

        }
        let data = this.listingsSource.value.map(function(el){
            if(el.id == listing.id){
                return listing;
            }
            return el;
        });

        this.listingsSource.next(data);

        

    }

    addListing(listing:any){
         this.listingsSource.value.push(listing);
        this.listingsSource.next(this.listingsSource.value);


    }

    //store authenticated user 

    private logInStatusSource = new BehaviorSubject<any>(false);

    logInStatusObs$ = this.logInStatusSource.asObservable();

    updateLogInStatus(){
        this.logInStatusSource.next(!this.logInStatusSource.value);
    }







}