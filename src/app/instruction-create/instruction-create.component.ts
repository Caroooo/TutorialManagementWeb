import { OnInit, Component, ViewChild, ElementRef, ViewChildren, QueryList } from "@angular/core";
import { Instruction } from "../../model/instruction";
import { Resource } from "../../model/resource";
import { FormBuilder } from "@angular/forms";
import { InstructionService } from "../../services/instruction-service";
import { InstructionStep } from "../../model/instruction-step";
import { InstructionChildStep } from "../../model/instruction-child-step";
import { InstructionStepCreateComponent } from "../instruction-step-create/instruction-step-create.component";
import { Observable } from "rxjs";
import { resolve } from "url";
import { InstructionChildStepCreateView } from "../../model/instruction-child-step-create-view";
import { InstructionStepCreateView } from "../../model/instruction-step-create-view";
import { InstructionCreateView } from "../../model/instruction-create-view";
import { InstructionChildStepCreateComponent } from "../instruction-child-step-create/instruction-child-step-create.component";
import { MatSnackBar } from "@angular/material";
import { InstructionType } from "../../model/instruction-type";

@Component({
    selector: 'instruction-create',
    templateUrl: './instruction-create.component.html',
    styleUrls: ['./instruction-create.component.css']
})
export class InstructionCreateComponent implements OnInit {

    @ViewChild('instructionName') instructionName: ElementRef;
    @ViewChild('instructionDescription') instructionDescription: ElementRef;
    @ViewChild('instructionType') instructionType;
    @ViewChildren('instructionStepCreate') instructionStepCreate: QueryList<InstructionStepCreateComponent>;

    preview: boolean = false;
    instruction: InstructionCreateView;
    steps: boolean[];
    index: number = 0;
    types: InstructionType[];

    constructor(private _formBuilder: FormBuilder, private instructionService: InstructionService, public snackBar: MatSnackBar) {
        this.steps = new Array();
        this.steps[0] = false;
    }

    ngOnInit() {
        this.instructionService.getInstructionTypes().subscribe(result => { this.types = result; });
    }

    removeStep(): void {
        this.steps[this.index] = false;
        this.index = this.index - 1;
    }

    loadStepCreate(): void {
        this.steps[this.index] = true;
        this.index = this.index + 1;
        this.steps[this.index] = false;
    }

    submit(): void {
        this.loadAndSendInstruction();
    }

    loadAndSendInstruction() {
        //create Instruction
        this.instruction = new InstructionCreateView();
        if (this.instructionName != null) {
            this.instruction.titel = this.instructionName.nativeElement.value;
        }
        if (this.instructionDescription != null) {
            this.instruction.shortDescription = this.instructionDescription.nativeElement.value;
        }

        if (this.instructionType != null) {
            this.instruction.instructionType = this.instructionType.selected.value;
        }
        //create Step
        this.instruction.steps = [];

        //  for (var step of this.instructionStepCreate.toArray()) {
        var stepIndex = 0;
        var step = this.instructionStepCreate.toArray()[stepIndex];
        if (step != null && step != undefined) {
            var instructionStep = new InstructionStepCreateView();
            instructionStep.titel = step.stepName.nativeElement.value;
            instructionStep.shortDescription = step.stepDescription.nativeElement.value;
            //create Child step
            if (step.instructionStepChildCreate != null) {
                instructionStep.instructionChildSteps = [];
                //  for (var childStep of step.instructionStepChildCreate.toArray()) {
                var index = 0;
                var childStep = step.instructionStepChildCreate.toArray()[index];
                if (childStep != null && childStep != undefined) {
                    var instructionChildStep = new InstructionChildStepCreateView();
                    instructionChildStep.titel = childStep.childName.nativeElement.value;
                    instructionChildStep.description = childStep.childDescription.nativeElement.value;
                    //post resource to server
                    if (childStep.resource.currentFileUpload != null && childStep.resource.currentFileUpload != undefined) {
                        childStep.resource.upload().subscribe(
                            result => {
                                instructionChildStep.resourceId = result;
                                instructionStep.instructionChildSteps.push(instructionChildStep);
                            },
                            error => console.log("Error :: " + error),
                            () => {

                                index = index + 1;
                                this.goToNextChildStep(index, step.instructionStepChildCreate.toArray(), instructionStep, stepIndex);
                            }
                        );

                    } else {
                        instructionStep.instructionChildSteps.push(instructionChildStep);
                        index = index + 1;
                        this.goToNextChildStep(index, step.instructionStepChildCreate.toArray(), instructionStep, stepIndex);
                    }
                }
            }
        }else{
            this.instructionService.postInstruction(this.instruction);

        }
    }

    goToNextChildStep(i: number, childSteps: InstructionChildStepCreateComponent[], instructionStep: InstructionStepCreateView, stepIndex: number): void {
        if (i < childSteps.length) {
            if (i === 0) {
                instructionStep.instructionChildSteps = [];
            }
            var childStep = childSteps[i];
            var instructionChildStep = new InstructionChildStepCreateView();
            instructionChildStep.titel = childStep.childName.nativeElement.value;
            instructionChildStep.description = childStep.childDescription.nativeElement.value;
            //post resource to server
            if (childStep.resource.currentFileUpload != null && childStep.resource.currentFileUpload != undefined) {
                childStep.resource.upload().subscribe(
                    result => {
                        instructionChildStep.resourceId = result;
                        instructionStep.instructionChildSteps.push(instructionChildStep);
                    },
                    error => console.log("Error :: " + error),
                    () => {

                        i = i + 1;
                        this.goToNextChildStep(i, childSteps, instructionStep, stepIndex);
                    }
                );

            } else {
                instructionStep.instructionChildSteps.push(instructionChildStep);
                i = i + 1;
                this.goToNextChildStep(i, childSteps, instructionStep, stepIndex);
            }
        } else {
            this.instruction.steps.push(instructionStep);
            stepIndex = stepIndex + 1;
            if (stepIndex < this.instructionStepCreate.toArray().length) {
                var step = this.instructionStepCreate.toArray()[stepIndex];
                var instructionStep = new InstructionStepCreateView();

                instructionStep.titel = step.stepName.nativeElement.value;
                instructionStep.shortDescription = step.stepDescription.nativeElement.value
                this.goToNextChildStep(0, step.instructionStepChildCreate.toArray(), instructionStep, stepIndex);
            } else {
                this.instructionService.postInstruction(this.instruction);
            }
        }

    }

    loadInstruction(): Instruction {
        //create Instruction
        var instruction = new Instruction();
        if (this.instructionName != null) {
            instruction.titel = this.instructionName.nativeElement.value;
        }
        if (this.instructionDescription != null) {
            instruction.shortDescription = this.instructionDescription.nativeElement.value;
        }
        //create Step
        instruction.steps = [];

        for (var step of this.instructionStepCreate.toArray()) {
            var instructionStep = new InstructionStep();
            instructionStep.titel = step.stepName.nativeElement.value;
            instructionStep.shortDescription = step.stepDescription.nativeElement.value;
            //create Child step
            if (step.instructionStepChildCreate != null) {
                instructionStep.instructionChildSteps = [];
                for (var childStep of step.instructionStepChildCreate.toArray()) {

                    var instructionChildStep = new InstructionChildStep();
                    instructionChildStep.titel = childStep.childName.nativeElement.value;
                    instructionChildStep.description = childStep.childDescription.nativeElement.value;
                    instructionStep.instructionChildSteps.push(instructionChildStep);
                }

            }
            instruction.steps.push(instructionStep);
        }
        return instruction;

    }
    loadPreview(): void {
        this.preview = true;
        this.snackBar.open("Diese Vorschau kann keine Navigationsbuttons sowie Ressourcen, zum Beispiel Bilder oder Videos, anzeigen. Wir bitten um Ihr Verständnis.", "", {
            duration: 10000,
        });
    }

    closePreview(): void {
        this.preview = false;
    }

    getInstructionTitel(): string {
        if (this.instructionName != null) {
            return this.instructionName.nativeElement.value;
        }
        return "";
    }
}