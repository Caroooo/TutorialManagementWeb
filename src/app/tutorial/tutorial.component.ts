import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { TutorialService } from '../../services/tutorial-service'
import { Tutorial } from '../../model/tutorial';
import { Resource } from '../../model/resource';
import { ResourceType } from '../../model/resource-type';
import { MatStepper, MatSnackBar, MatExpansionModule, MatExpansionPanel } from '@angular/material';
import { TutorialStep } from '../../model/tutorial-step';
import { Observable } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { TutorialChildStep } from '../../model/tutorial-child-step';
import {VideoComponent} from '../video/video.component';
import { User } from '../../model/user';
import { UserService } from '../../services/user-service';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  @ViewChild('stepper') stepper;
  @Input() user : User;

  stepStates: boolean[];
  stepsInitializied: boolean = false;
  tutorials: Tutorial[];
  tutorial: Tutorial;
  resourceContent: string[] = new Array();
  resources: Resource[];
  laymanInformation: number = 0;
  rookieInformation: number = 0;

  constructor(private domSanitizer: DomSanitizer, private _formBuilder: FormBuilder, private tutorialService: TutorialService,private userService: UserService,  public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getTutorialById(11);

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
    var length: number = tutorial.steps.length;

    //calc absolut number of childsteps
    var absolut: number = length;
    for (i = 0; i < length; i++) {
      absolut = absolut + tutorial.steps[i].tutorialChildSteps.length;
    }
    //fill in resources in resources array
    this.resources = new Array(absolut);
    var j: number;
    var g: number = 0;
    while (g < this.resources.length) {
      for (i = 0; i < length; i++) {
        for (j = 0; j < tutorial.steps[i].tutorialChildSteps.length; j++) {
          this.resources[g] = tutorial.steps[i].tutorialChildSteps[j].resource;
          g = g + 1;
        }
      }
    }
    //load resourceContent for resources
    for (i = 0; i < this.resources.length; i++) {
      this.showFile(this.resources[i], i);
    }
  }

  getTutorials(): void {
    this.tutorialService.getTutorials()
      .subscribe(
        resultArray => this.tutorials = resultArray,
        error => console.log("Error :: " + error)
      )
  }

  getTutorialById(id: number): void {
    this.tutorialService.getTutorialById(id)
    .subscribe(
      result => this.init(result),      
      error => console.log("Error :: " + error)
    )
  }

  init(tutorial: Tutorial) {
    this.tutorial = tutorial;
    this.initResourceContent(tutorial);
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
    //calc number of child steps
    var chidStepNum = 0;
    for(let s of this.tutorial.steps){
      for(let child of s.tutorialChildSteps){
          chidStepNum = chidStepNum + 1;
      }
    }
    this.user.rookieInformation = (this.rookieInformation / chidStepNum) + this.user.rookieInformation;
    this.user.laymanInformation = this.laymanInformation + this.user.laymanInformation;
    this.userService.updateInformationCount(this.user);

    this.snackBar.open("Danke " +this.user.userName + "! Das Tutorial wurde abgeschlossen.","", {
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


  clickExpansionPanel(childStep: TutorialChildStep){
    console.log(childStep.id);
  }
  increaseLaymanInformationCount() :void {
    this.laymanInformation = this.laymanInformation + 3;
  }

  decreaseLaymanInformationCount() :void {
    this.laymanInformation = this.laymanInformation - 1;
  } 

  showLaymanInformation(): boolean{
    if(this.user.laymanInformation >= 3){
      return true;
    }
    return false;
  }

  increaseRookieInformationCount() :void {
    this.rookieInformation = this.rookieInformation + 3;
  }

  decreaseRookieInformationCount() :void {
    this.rookieInformation = this.rookieInformation - 1;
  } 

  showRookieInformation(): boolean{
    if(this.user.rookieInformation >= 6){
      return true;
    }
    return false;
  }
  
  hasResource(childStep: TutorialChildStep): boolean{
    if(childStep != null){
      if(childStep.resource != null){
        return true;
      }
    }
    return false;
  }  
}
