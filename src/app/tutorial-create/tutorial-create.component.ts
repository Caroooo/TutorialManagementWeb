import { OnInit, Component, ViewChild, ElementRef, ViewChildren, QueryList } from "@angular/core";
import { Tutorial } from "../../model/tutorial";
import { Resource } from "../../model/resource";
import { FormBuilder } from "@angular/forms";
import { TutorialService } from "../../services/tutorial-service";
import { TutorialStep } from "../../model/tutorial-step";
import { TutorialChildStep } from "../../model/tutorial-child-step";
import { TutorialStepCreateComponent } from "../tutorial-step-create/tutorial-step-create.component";
import { Observable } from "rxjs";
import { resolve } from "url";
import { TutorialChildStepCreateView } from "../../model/tutorial-child-step-create-view";
import { TutorialStepCreateView } from "../../model/tutorial-step-create-view";
import { TutorialCreateView } from "../../model/tutorial-create-view";
import { TutorialChildStepCreateComponent } from "../tutorial-child-step-create/tutorial-child-step-create.component";
import { MatSnackBar } from "@angular/material";

@Component({
    selector: 'tutorial-create',
    templateUrl: './tutorial-create.component.html',
    styleUrls: ['./tutorial-create.component.css']
})
export class TutorialCreateComponent implements OnInit {

    @ViewChild('tutorialName') tutorialName: ElementRef;
    @ViewChild('tutorialDescription') tutorialDescription: ElementRef;
    @ViewChildren('tutorialStepCreate') tutorialStepCreate: QueryList<TutorialStepCreateComponent>;

    preview: boolean = false;
    tutorial: TutorialCreateView;
    steps: boolean[];
    index: number = 0;
    constructor(private _formBuilder: FormBuilder, private tutorialService: TutorialService, public snackBar: MatSnackBar) {
        this.steps = new Array();
        this.steps[0] = false;
    }

    ngOnInit() {

    }

    removeStep() : void{
        this.steps[this.index] = false;
        this.index = this.index - 1;
    }

    loadStepCreate(): void {
        this.steps[this.index] = true;
        this.index = this.index + 1;
        this.steps[this.index] = false;
    }

    submit(): void {
        this.loadAndSendTutorial();
    }

    loadAndSendTutorial() {
        //create Tutorial
        this.tutorial = new TutorialCreateView();
        if (this.tutorialName != null) {
            this.tutorial.titel = this.tutorialName.nativeElement.value;
        }
        if (this.tutorialDescription != null) {
            this.tutorial.shortDescription = this.tutorialDescription.nativeElement.value;
        }
        //create Step
        this.tutorial.steps = [];

        //  for (var step of this.tutorialStepCreate.toArray()) {
        var stepIndex = 0;
        var step = this.tutorialStepCreate.toArray()[stepIndex];
        var tutorialStep = new TutorialStepCreateView();
        tutorialStep.titel = step.stepName.nativeElement.value;
        tutorialStep.shortDescription = step.stepDescription.nativeElement.value;
        //create Child step
        if (step.tutorialStepChildCreate != null) {
            tutorialStep.tutorialChildSteps = [];
            //  for (var childStep of step.tutorialStepChildCreate.toArray()) {
            var index = 0;
            var childStep = step.tutorialStepChildCreate.toArray()[index];
            var tutorialChildStep = new TutorialChildStepCreateView();
            tutorialChildStep.titel = childStep.childName.nativeElement.value;
            tutorialChildStep.description = childStep.childDescription.nativeElement.value;
            //post resource to server
            if (childStep.resource.currentFileUpload != null && childStep.resource.currentFileUpload != undefined) {
                childStep.resource.upload().subscribe(
                    result => {
                        tutorialChildStep.resourceId = result;
                        tutorialStep.tutorialChildSteps.push(tutorialChildStep);
                    },
                    error => console.log("Error :: " + error),
                    () => {

                        index = index + 1;
                        this.goToNextChildStep(index, step.tutorialStepChildCreate.toArray(), tutorialStep, stepIndex);
                    }
                );

            } else {
                tutorialStep.tutorialChildSteps.push(tutorialChildStep);
                index = index + 1;
                this.goToNextChildStep(index, step.tutorialStepChildCreate.toArray(), tutorialStep, stepIndex);
            }

        }
    }

    goToNextChildStep(i: number, childSteps: TutorialChildStepCreateComponent[], tutorialStep: TutorialStepCreateView, stepIndex: number): void {
        if (i < childSteps.length) {
            if (i === 0) {
                tutorialStep.tutorialChildSteps = [];
            }
            var childStep = childSteps[i];
            var tutorialChildStep = new TutorialChildStepCreateView();
            tutorialChildStep.titel = childStep.childName.nativeElement.value;
            tutorialChildStep.description = childStep.childDescription.nativeElement.value;
            //post resource to server
            if (childStep.resource.currentFileUpload != null && childStep.resource.currentFileUpload != undefined) {
                childStep.resource.upload().subscribe(
                    result => {
                        tutorialChildStep.resourceId = result;
                        tutorialStep.tutorialChildSteps.push(tutorialChildStep);
                    },
                    error => console.log("Error :: " + error),
                    () => {

                        i = i + 1;
                        this.goToNextChildStep(i, childSteps, tutorialStep, stepIndex);
                    }
                );

            } else {
                tutorialStep.tutorialChildSteps.push(tutorialChildStep);
                i = i + 1;
                this.goToNextChildStep(i, childSteps, tutorialStep, stepIndex);
            }
        } else {
            this.tutorial.steps.push(tutorialStep);
            stepIndex = stepIndex + 1;
            if (stepIndex < this.tutorialStepCreate.toArray().length) {
                var step = this.tutorialStepCreate.toArray()[stepIndex];
                var tutorialStep = new TutorialStepCreateView();

                tutorialStep.titel = step.stepName.nativeElement.value;
                tutorialStep.shortDescription = step.stepDescription.nativeElement.value
                this.goToNextChildStep(0, step.tutorialStepChildCreate.toArray(), tutorialStep, stepIndex);
            } else {
                this.tutorialService.postTutorial(this.tutorial);
            }
        }

    }

    loadTutorial(): Tutorial {
        //create Tutorial
        var tutorial = new Tutorial();
        if (this.tutorialName != null) {
            tutorial.titel = this.tutorialName.nativeElement.value;
        }
        if (this.tutorialDescription != null) {
            tutorial.shortDescription = this.tutorialDescription.nativeElement.value;
        }
        //create Step
        tutorial.steps = [];

        for (var step of this.tutorialStepCreate.toArray()) {
            var tutorialStep = new TutorialStep();
            tutorialStep.titel = step.stepName.nativeElement.value;
            tutorialStep.shortDescription = step.stepDescription.nativeElement.value;
            //create Child step
            if (step.tutorialStepChildCreate != null) {
                tutorialStep.tutorialChildSteps = [];
                for (var childStep of step.tutorialStepChildCreate.toArray()) {

                    var tutorialChildStep = new TutorialChildStep();
                    tutorialChildStep.titel = childStep.childName.nativeElement.value;
                    tutorialChildStep.description = childStep.childDescription.nativeElement.value;
                    tutorialStep.tutorialChildSteps.push(tutorialChildStep);
                }             

            }
            tutorial.steps.push(tutorialStep);
        }
        return tutorial;

    }
    loadPreview(): void {
        this.preview = true;
        this.snackBar.open("Diese Vorschau kann keine Navigationsbuttons sowie Ressourcen, zum Beispiel Bilder oder Videos, anzeigen. Wir bitten um Ihr Verständnis.","", {
            duration: 10000,
          });
    }

    closePreview(): void {
        this.preview = false;
    }

    getTutorialTitel(): string {
        if (this.tutorialName != null) {
            return this.tutorialName.nativeElement.value;
        }
        return "";
    }
}