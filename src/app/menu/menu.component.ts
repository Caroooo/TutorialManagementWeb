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

    constructor( private route: ActivatedRoute, private userService: UserService) {
        this.route.params.subscribe( params => this.getUser(params['user'])); 
        
    }

    ngOnInit(): void {
    }

    goToCreateTutorial() : void{
       this.account = false;
        this.create = true;
    }

    goBack(): void{
        this.create = false;
        this.account = false;
    }

    getUser(id: number): void {
        this.userService.getUserById(id).subscribe(
            resultArray => this.user = resultArray,
            error => console.log("Error :: " + error)
        )
    }

    loadAccount() : void {
        this.create = false;
        this.account = true;
    }
}