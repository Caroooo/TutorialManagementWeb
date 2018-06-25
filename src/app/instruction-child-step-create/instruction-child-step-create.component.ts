import { OnInit, Component, ViewChild, ElementRef, Input } from "@angular/core";
import { Instruction } from "../../model/instruction";
import { Resource } from "../../model/resource";
import { FormBuilder } from "@angular/forms";
import { InstructionService } from "../../services/instruction-service";
import { FormUploadComponent } from "../form-upload/form-upload.component";

@Component({
    selector: 'instruction-child-step-create',
    templateUrl: './instruction-child-step-create.component.html',
    styleUrls: ['./instruction-child-step-create.component.css']
  })
  export class InstructionChildStepCreateComponent implements OnInit {
    @ViewChild('childName') childName: ElementRef;
    @ViewChild('childDescription') childDescription: ElementRef;
    @ViewChild('resource') resource: FormUploadComponent;
    @Input() instructionStepTitel: string;
  
    constructor(private _formBuilder: FormBuilder, private instructionService: InstructionService) {
  
    }
  
    ngOnInit() {
  
    }
}