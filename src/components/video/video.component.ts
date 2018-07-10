import { OnInit, Component, Input } from "@angular/core";
import { ResourceType } from "../../model/resource-type";

export interface IMedia {
    title: string;
    src: string;
    type: string;
}

@Component({
    selector: 'video-component',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
    @Input() data: string;

    ngOnInit(): void {
    }
}