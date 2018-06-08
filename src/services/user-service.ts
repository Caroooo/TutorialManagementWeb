import { Injectable } from "@angular/core";
import { Http, Response, ResponseType, ResponseContentType } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { ResourceType } from "../model/resource-type";
import { User } from "../model/user";

@Injectable()
export class UserService {

    private apiUrl = "http://localhost:8080/users";

    constructor(private http: Http, private httpClient: HttpClient) {
    }


    getUserByCredentials(userName: string, password: string): Observable<User> {
        return this.http.get(this.apiUrl + "/user?userName=" + userName + "&password=" + password)
            .map((response: Response) => {
                return <User>response.json();
            })
            .catch(this.handleError);
    }

    getUserById(id: number): Observable<User> {
        return this.http.get(this.apiUrl +"/"+ id)
            .map((response: Response) => {
                return <User>response.json();
            })
            .catch(this.handleError);
    }

    updateUser(user: User) {
        console.log("User will be updated. + " +user + this.apiUrl);
        this.httpClient.put(this.apiUrl, user)
            .map((response: Response) => {
                return response;
            })
            .catch(this.handleError);
    }

    updateInformationCount(user: User) {
        this.httpClient.put(this.apiUrl + "/" + user.id +"?laymanInformation=" + user.laymanInformation + "&rookieInformation=" + user.rookieInformation,null)
            .map((response: Response) => {
                return response;
            })
            .catch(this.handleError).subscribe();
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}