import {Injectable} from "@angular/core";
 import {Http, Response, ResponseType, ResponseContentType} from "@angular/http";
 import {Observable} from "rxjs/Observable";
 import "rxjs/Rx";
 import {Tutorial} from "../model/tutorial";
import { HttpClient } from "@angular/common/http";
import { ResourceType } from "../model/resource-type";
 
 @Injectable()
 export class TutorialService {
 
    private apiUrl = "http://localhost:8080/tutorials";
 
     constructor(private http: Http, private httpClient: HttpClient) {
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

     getResource(resourceId : number) : Observable<any>{
        return this.httpClient
        .get(this.apiUrl + "/resources/" + resourceId,  {responseType: 'text'});
     }
 
     private handleError(error: Response) {
         return Observable.throw(error.statusText);
     }
 }