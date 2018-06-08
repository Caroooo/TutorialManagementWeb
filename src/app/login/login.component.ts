import { OnInit, Component, ViewChild, ElementRef } from "@angular/core";
import { UserService } from '../../services/user-service'
import { User } from "../../model/user";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('username') username: ElementRef;
    @ViewChild('password') password: ElementRef;

    user: User;
    constructor(private userService: UserService, private router: Router, public snackBar: MatSnackBar) {

    }

    ngOnInit(): void {
    }

    onSubmit() {
        this.getUser(this.username.nativeElement.value, this.password.nativeElement.value);

        //   console.log("successful login!");
    }

    getUser(username: string, password: string): void {
        this.userService.getUserByCredentials(username, password).subscribe(resultArray => {
            this.goToTutorial(resultArray);
            this.snackBar.open("Hallo " + username, "", {
                duration: 2000,
            });
        },

            error => {
                console.log("Error :: " + error);
                this.snackBar.open("Username oder Passwort ist falsch ", "", {
                    duration: 2000,
                });
            }
        )
    }

    goToTutorial(user: User): void {
        this.router.navigate(['/main/' + user.id]);
    }
}