import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../model/user";

@Component({
    selector: 'user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
    @Input() user: User;

    ngOnInit(): void {
    }
}