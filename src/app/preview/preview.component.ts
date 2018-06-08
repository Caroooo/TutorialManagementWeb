import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { TutorialService } from '../../services/tutorial-service'
import { Tutorial } from '../../model/tutorial';
import { Resource } from '../../model/resource';
import { ResourceType } from '../../model/resource-type';
import { MatStepper, MatSnackBar } from '@angular/material';
import { TutorialStep } from '../../model/tutorial-step';
import { Observable } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { TutorialChildStep } from '../../model/tutorial-child-step';
import { VideoComponent } from '../video/video.component';


@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @ViewChild('stepper') stepper;
  @Input() tutorialInput: Tutorial;

  stepStates: boolean[];
  stepsInitializied: boolean = false;
  resourceContent: string[] = new Array();
  resources: Resource[];
  tutorial: Tutorial;


  constructor(private domSanitizer: DomSanitizer, private _formBuilder: FormBuilder, private tutorialService: TutorialService, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    //this.getTutorialById(1);
    this.init(this.tutorialInput);

  }

  getIdOfResourceContent(resource: Resource): number {
    var i: number;
    for (i = 0; i < this.resources.length; i++) {
      if (this.resources[i] != null) {
        if (this.resources[i].id === resource.id) {
          return i;
        }
      }
    }
  }

  initResourceContent(tutorial: Tutorial) {
    this.resourceContent = new Array();
    var i: number;
    if (tutorial.steps != null) {
      var length: number = tutorial.steps.length;

      //calc absolut number of childsteps
      var absolut: number = length;
      for (i = 0; i < length; i++) {
        if (tutorial.steps[i].tutorialChildSteps != null) {
          absolut = absolut + tutorial.steps[i].tutorialChildSteps.length;
        }
      }
      //fill in resources in resources array
      this.resources = new Array(absolut);
      var j: number;
      var g: number = 0;
      while (g < this.resources.length) {
        for (i = 0; i < length; i++) {
          if (tutorial.steps[i].tutorialChildSteps != null) {
            for (j = 0; j < tutorial.steps[i].tutorialChildSteps.length; j++) {
              this.resources[g] = tutorial.steps[i].tutorialChildSteps[j].resource;
              g = g + 1;
            }
          }
        }
      }
      //load resourceContent for resources
      for (i = 0; i < this.resources.length; i++) {
        this.showFile(this.resources[i], i);
      }
    }
  }


  getTutorialById(id: number): void {
    this.tutorialService.getTutorialById(id).subscribe(
      resultArray => this.init(resultArray),
      error => console.log("Error :: " + error)
    )
  }

  init(tutorial: Tutorial) {
    this.tutorial = tutorial;
   // this.initResourceContent(tutorial);
  }

  hasPrevStep(): boolean {
    if (this.stepper.selectedIndex > 0) {
      return true;
    }
    return false;
  }

  hasNextStep(): boolean {
     if (this.stepper.selectedIndex < this.stepper._steps.length - 1) {
      return true;
    }
    return false;
  }
  isLastStep(): boolean {
    if (this.stepper.selectedIndex === this.stepper._steps.length - 1) {
      return true;
    }
    return false;
  }
  done(): void {
    this.snackBar.open("Danke! Das Tutorial wurde abgeschlossen.","", {
      duration: 2000,
    });
  }
  showFile(resource: Resource, index: number) {
    if (resource != null) {
      this.tutorialService.getResourceFile(resource.id).subscribe(data => {
        this.resourceContent[index] = data;
      });
    }
  }
  hasResource(childStep: TutorialChildStep): boolean {
    if (childStep != null) {
      if (childStep.resource != null) {
        return true;
      }
    }
    return false;
  }
}
