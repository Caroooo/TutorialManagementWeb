import { OnInit, Component, Input } from "@angular/core";
import { ResourceType } from "../../model/resource-type";

export interface IMedia {
    title: string;
    src: string;
    type: string;
}

@Component({
    selector: 'audio-component',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
    @Input() data: string;

    ngOnInit(): void {
    }
}