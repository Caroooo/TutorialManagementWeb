import {Injectable} from "@angular/core";
 import {Http, Response, ResponseType} from "@angular/http";
 import {Observable} from "rxjs/Observable";
 import "rxjs/Rx";
 import {Tutorial} from "../model/tutorial";
 
 @Injectable()
 export class TutorialService {
 
    private apiUrl = "http://localhost:8080/tutorials";
 
     constructor(private http: Http) {
     }
 
     getTutorials(): Observable<Tutorial[]> {
         return this.http
             .get(this.apiUrl)
             .map((response: Response) => {
                 return <Tutorial[]>response.json();
             })
             .catch(this.handleError);
     }

     getTutorialById(id: number) : Observable<Tutorial> {
        return this.http.get(this.apiUrl + "/" + id)
        .map((response: Response) => {
            return <Tutorial>response.json();
        })
        .catch(this.handleError);
     }

     getResource(resourceId : number) : Observable<String>{
        return this.http.get(this.apiUrl + "/resources/" + resourceId)
        .map((response: Response) => {
            return <String>response.text();
        })
        .catch(this.handleError);
     }
 
     private handleError(error: Response) {
         return Observable.throw(error.statusText);
     }
 }