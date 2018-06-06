import { Injectable } from "@angular/core";
import { Http, Response, ResponseType, ResponseContentType, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { Tutorial } from "../model/tutorial";
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpResponse } from "@angular/common/http";
import { ResourceType } from "../model/resource-type";
import { Resource } from "../model/resource";
import { TutorialCreateView } from "../model/tutorial-create-view";
import { TutorialStepCreateView } from "../model/tutorial-step-create-view";
import { TutorialChildStepCreateView } from "../model/tutorial-child-step-create-view";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TutorialService {

    private apiUrl = "http://localhost:8080/tutorials";

    constructor(private http: Http, private httpClient: HttpClient) {
    }

    postTutorial(tutorial: TutorialCreateView) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify(tutorial));
        return this.httpClient.post(this.apiUrl, tutorial).map((res: Response) => res.json())
            .catch(this.handleError).subscribe();
    }

    getTutorials(): Observable<Tutorial[]> {
        return this.httpClient
            .get(this.apiUrl)
            .map((response: Response) => {
                return <Tutorial[]>response.json();
            })
            .catch(this.handleError);
    }

    getTutorialById(id: number): Observable<Tutorial> {
        return this.httpClient.get(this.apiUrl + "/" + id)
            .map((response: Response) => {
                return <Tutorial>response.json();
            })
            .catch(this.handleError);
    }

    getResourceFile(resourceId: number): Observable<any> {
        return this.httpClient
            .get(this.apiUrl + "/resources/" + resourceId, { responseType: 'text' });
    }

    getResource(resourceId: number): Observable<Resource> {
        return this.httpClient
            .get(this.apiUrl + "/resources/" + resourceId).map((response: Response) => {
                return <Resource>response.json();
            })
            .catch(this.handleError);;
    }

    /*   postResource(file: File): Observable<HttpEvent<{}>> {
           const formdata: FormData = new FormData();
        
           formdata.append('file', file);
        
           const req = new HttpRequest('POST', this.apiUrl + "/resources/", formdata, {
             reportProgress: true,
             responseType: 'text'
           });     
          // return this.httpClient.request(req);
           this.httpClient.post(this.apiUrl + "/resources/", formdata).map(resp => console.log(resp));
         }*/

    postResource(file: File) {
        const formdata: FormData = new FormData();

        formdata.append('file', file);

        const req = new HttpRequest('POST', this.apiUrl + "/resources/", formdata, {
            reportProgress: true,
            responseType: 'text'
        });
        //  return this.httpClient.request(req);

        return this.httpClient.post(this.apiUrl + "/resources/", formdata, { observe: 'response' })
            .map((response: HttpResponse<any>) => {
                return parseInt(response.headers.get("Location").replace(this.apiUrl + "/resources/", ""));
            });

    }

    postResourcePromise(file: File): Promise<number> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        return this.httpClient
            .post(this.apiUrl + "/resources/", formdata, { observe: 'response' })
            .map((response: HttpResponse<any>) => {
                return parseInt(response.headers.get("Location").replace(this.apiUrl + "/resources/", ""));
            })
            .toPromise();
    }

    private extractData(res: HttpResponse<any>) {
        let body = res.body;
        return body || {};
    }
    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}