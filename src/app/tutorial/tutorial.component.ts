import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { TutorialService } from '../../services/tutorial-service'
import { Tutorial } from '../../model/tutorial';
import { Resource } from '../../model/resource';
import { ResourceType } from '../../model/resource-type';
import { MatStepper } from '@angular/material';
import { TutorialStep } from '../../model/tutorial-step';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  @ViewChild('stepper') stepper;
 
  stepStates: boolean[];
  stepsInitializied : boolean = false;
  tutorials: Tutorial[];
  tutorial: Tutorial;
  image: String;


  constructor(private _formBuilder: FormBuilder, private tutorialService: TutorialService) {

  }

  getTutorials(): void {
    this.tutorialService.getTutorials()
      .subscribe(
        resultArray => this.tutorials = resultArray,
        error => console.log("Error :: " + error)
      )
  }

  getTutorialById(id: number): void {
    this.tutorialService.getTutorialById(id).subscribe(
      resultArray => this.initStepStates(resultArray),
      error => console.log("Error :: " + error)
    )
  }

  private initStepStates(t : Tutorial): void { 
    console.log(t); 
    this.tutorial = t;
    this.stepStates = new Array<boolean>();
    if(!this.stepsInitializied){
      for (var i = 0; i < t.steps.length; i++) {
        this.stepStates.push(false);
      }
      this.stepsInitializied = true;
    }
    
  }
  private getStepState(): boolean {
    console.log("step state of step " + this.stepper.selectedIndex + " is " + this.stepStates[this.stepper.selectedIndex]);
    return this.stepStates[this.stepper.selectedIndex];
   

  }
  private setCompleted(): void {
    this.stepStates[this.stepper.selectedIndex] = true;
  }

  private stepDone(): boolean {
      return this.stepStates[this.stepper.selectedIndex];
  }

  private nextStep(): void {
    this.stepper.next();
    console.log(this.stepper.selectedIndex);
    //this.stepStates[this.stepper.selectedIndex] = false;
  }

  ngOnInit() {
    this.getTutorialById(1);
  }

  isImage(resource: Resource): boolean {
    if (resource != null) {
      if (resource.resourceType === ResourceType.IMAGE) {
        console.log("it is a image");
        this.getResource(resource);
        return true;
      }
    }
    return false;
  }

  getResource(resource: Resource): void {
    if (resource != null) {
      this.tutorialService.getResource(resource.id).subscribe(
        resultArray => this.image = resultArray,
        error => console.log("Error :: " + error)
      )
      console.log("image loaded: " + this.image);
    }
  }


}
