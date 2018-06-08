import { OnInit, Component, ViewChild, ElementRef, Input, ViewChildren, QueryList } from "@angular/core";
import { Tutorial } from "../../model/tutorial";
import { Resource } from "../../model/resource";
import { FormBuilder } from "@angular/forms";
import { TutorialService } from "../../services/tutorial-service";
import { TutorialChildStepCreateComponent } from "../tutorial-child-step-create/tutorial-child-step-create.component";

@Component({
    selector: 'tutorial-step-create',
    templateUrl: './tutorial-step-create.component.html',
    styleUrls: ['./tutorial-step-create.component.css']
  })
  export class TutorialStepCreateComponent implements OnInit {
    
    @ViewChild('stepName') stepName: ElementRef;
    @ViewChild('stepDescription') stepDescription: ElementRef;
    @ViewChildren('tutorialStepChildCreate') tutorialStepChildCreate : QueryList<TutorialChildStepCreateComponent>;
    @Input() tutorialTitel: string;

    steps: boolean[];
    index: number = 0;

    constructor(private _formBuilder: FormBuilder, private tutorialService: TutorialService) {
      this.steps = new Array();
      this.steps[0] = false;
    }
  
    ngOnInit() {
  
    }

    removeStep() : void{
      this.steps[this.index] = false;
      this.index = this.index - 1;
  }

    loadChildStepCreate() : void {
      this.steps[this.index] = true;
      this.index = this.index + 1;
      this.steps[this.index] = false;   }

   getStepTitel() : string{
    if (this.stepName != null) {
      return this.stepName.nativeElement.value;
  }
  return "";
   }
}