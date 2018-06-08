import { OnInit, Component, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../../model/user";
import { UserService } from "../../services/user-service";

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    user: User;

    create: boolean = false;
    account: boolean = false;
    tutorialAvailable: boolean = false;

    constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
        this.route.params.subscribe(params => this.getUser(params['user']));

    }

    ngOnInit(): void {
    }

    goToCreateTutorial(): void {
        this.account = false;
        this.create = true;
        this.tutorialAvailable = false;

    }

    goBack(): void {
        this.create = false;
        this.account = false;
        this.tutorialAvailable = false;
    }

    getUser(id: number): void {
        this.userService.getUserById(id).subscribe(
            resultArray => this.user = resultArray,
            error => console.log("Error :: " + error)
        )
    }

    hasWriteRights(): boolean {
        if (this.user != null && this.user != undefined) {
            return this.user.canWrite;
        }
        return false;
    }
    logout(): void {
        this.router.navigate(['/login']);

    }

    loadAccount(): void {
        this.create = false;
        this.account = true;
    }

    showTutorial() {
        this.create = false;
        this.account = false;
        this.tutorialAvailable = true;
    }
}