import { OnInit, Component, ViewChild, ElementRef, Input, ViewChildren, QueryList } from "@angular/core";
import { Instruction } from "../../model/instruction";
import { Resource } from "../../model/resource";
import { FormBuilder } from "@angular/forms";
import { InstructionService } from "../../services/instruction-service";
import { InstructionChildStepCreateComponent } from "../instruction-child-step-create/instruction-child-step-create.component";

@Component({
    selector: 'instruction-step-create',
    templateUrl: './instruction-step-create.component.html',
    styleUrls: ['./instruction-step-create.component.css']
  })
  export class InstructionStepCreateComponent implements OnInit {
    
    @ViewChild('stepName') stepName: ElementRef;
    @ViewChild('stepDescription') stepDescription: ElementRef;
    @ViewChildren('instructionStepChildCreate') instructionStepChildCreate : QueryList<InstructionChildStepCreateComponent>;
    @Input() instructionTitel: string;

    steps: boolean[];
    index: number = 0;

    constructor(private _formBuilder: FormBuilder, private instructionService: InstructionService) {
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