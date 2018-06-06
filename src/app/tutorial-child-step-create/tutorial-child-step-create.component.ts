import { OnInit, Component, ViewChild, ElementRef, Input } from "@angular/core";
import { Tutorial } from "../../model/tutorial";
import { Resource } from "../../model/resource";
import { FormBuilder } from "@angular/forms";
import { TutorialService } from "../../services/tutorial-service";
import { FormUploadComponent } from "../form-upload/form-upload.component";

@Component({
    selector: 'tutorial-child-step-create',
    templateUrl: './tutorial-child-step-create.component.html',
    styleUrls: ['./tutorial-child-step-create.component.css']
  })
  export class TutorialChildStepCreateComponent implements OnInit {
    @ViewChild('childName') childName: ElementRef;
    @ViewChild('childDescription') childDescription: ElementRef;
    @ViewChild('resource') resource: FormUploadComponent;
    @Input() tutorialStepTitel: string;
  
    constructor(private _formBuilder: FormBuilder, private tutorialService: TutorialService) {
  
    }
  
    ngOnInit() {
  
    }
}