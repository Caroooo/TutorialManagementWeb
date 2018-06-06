import { OnInit, Component, ViewChild, ElementRef } from "@angular/core";
import { UserService } from '../../services/user-service'
import { User } from "../../model/user";
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('username') username: ElementRef;
    @ViewChild('password') password: ElementRef;

    user: User;
    constructor(private userService: UserService, private router: Router) {

    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.getUser(this.username.nativeElement.value, this.password.nativeElement.value);
     //   console.log("successful login!");
    }

    getUser(username: string, password: string): void {
        this.userService.getUserByCredentials(username, password).subscribe(
            resultArray => this.goToTutorial(resultArray),
            error => console.log("Error :: " + error)
        )
    }

    goToTutorial(user: User) : void{
        this.router.navigate(['/main/'+ user.id]);
    }
}