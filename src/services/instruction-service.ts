import { Injectable } from "@angular/core";
import { Http, Response, ResponseType, ResponseContentType, RequestOptions, Headers } from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Instruction } from "../model/instruction";
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest, HttpResponse } from "@angular/common/http";
import { ResourceType } from "../model/resource-type";
import { Resource } from "../model/resource";
import { InstructionCreateView } from "../model/instruction-create-view";
import { InstructionStepCreateView } from "../model/instruction-step-create-view";
import { InstructionChildStepCreateView } from "../model/instruction-child-step-create-view";
import 'rxjs/add/operator/toPromise';
import { InstructionType } from "../model/instruction-type";

@Injectable()
export class InstructionService {

  
    private apiUrl = "http://localhost:8080/instructions";

    constructor(private http: Http, private httpClient: HttpClient) {
    }

    postInstruction(instruction: InstructionCreateView) {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify(instruction));
        return this.httpClient.post(this.apiUrl, instruction).map((res: Response) => res.json())
            .catch(this.handleError).subscribe();
    }

    getInstructions(): Observable<Instruction[]> {

        return this.httpClient
            .get(this.apiUrl)
            .map((response: Response) => {
                return <Instruction[]>response.json();
            })
            .catch(this.handleError);
    }

    getInstructionById(id: number): Observable<Instruction> {
        return this.httpClient
            .get(this.apiUrl + "/" + id)
            .map((response: Response) => {
                return response;
            })
            .catch(this.handleError);
    }

    getResourceFile(resourceId: number): Observable<any> {
        return this.httpClient
            .get(this.apiUrl + "/resources/file/" + resourceId, { responseType: 'text' });
    }

    getResource(resourceId: number): Observable<Resource> {
        return this.httpClient
            .get(this.apiUrl + "/resources/" + resourceId).map((response: Response) => {
                return <Resource> response.json();
            })
            .catch(this.handleError);;
    }

    postResource(file: File) {
        const formdata: FormData = new FormData();

        formdata.append('file', file);

        return this.httpClient.post(this.apiUrl + "/resources/", formdata, { observe: 'response' })
            .map((response: HttpResponse<any>) => {
                return parseInt(response.headers.get("Location").replace(this.apiUrl + "/resources/", ""));
            });

    }

    private extractData(res: HttpResponse<any>) {
        let body = res.body;
        return body || {};
    }
    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    getInstructionTypes() : Observable<InstructionType[]>{
        return this.httpClient
        .get(this.apiUrl + "/types")
        .map((response: Response) => {
            return <InstructionType[]> response.json();
        })
        .catch(this.handleError);
    }
}