import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { InstructionService } from '../../services/instruction-service'
import { Instruction } from '../../model/instruction';
import { Resource } from '../../model/resource';
import { ResourceType } from '../../model/resource-type';
import { MatStepper, MatSnackBar, MatExpansionModule, MatExpansionPanel } from '@angular/material';
import { InstructionStep } from '../../model/instruction-step';
import { Observable } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { InstructionChildStep } from '../../model/instruction-child-step';
import { VideoComponent } from '../video/video.component';
import { User } from '../../model/user';
import { UserService } from '../../services/user-service';


@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {
  @ViewChild('stepper') stepper;
  @Input() user: User;

  stepStates: boolean[];
  stepsInitializied: boolean = false;
  instructions: Instruction[];
  instruction: Instruction;
  resourceContent: string[] = new Array();
  resources: Resource[];
  knowledgeCount: number[] = new Array();

  constructor(private domSanitizer: DomSanitizer, private _formBuilder: FormBuilder, private instructionService: InstructionService, private userService: UserService, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getInstructionById(22);
   // this.getInstructionById(106);


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

  initResourceContent(instruction: Instruction) {
    this.resourceContent = new Array();
    var i: number;
    var length: number = instruction.steps.length;

    //calc absolut number of childsteps
    var absolut: number = length;
    for (i = 0; i < length; i++) {
      absolut = absolut + instruction.steps[i].instructionChildSteps.length;
    }
    //fill in resources in resources array
    this.resources = new Array(absolut);
    var j: number;
    var g: number = 0;
    while (g < this.resources.length) {
      for (i = 0; i < length; i++) {
        for (j = 0; j < instruction.steps[i].instructionChildSteps.length; j++) {
          this.resources[g] = instruction.steps[i].instructionChildSteps[j].resource;
          g = g + 1;
        }
      }
    }
    //load resourceContent for resources
    for (i = 0; i < this.resources.length; i++) {
      this.showFile(this.resources[i], i);
    }
  }

  getInstructions(): void {
    this.instructionService.getInstructions()
      .subscribe(
        resultArray => this.instructions = resultArray,
        error => console.log("Error :: " + error)
      )
  }

  getInstructionById(id: number): void {
    this.instructionService.getInstructionById(id)
      .subscribe(
        result => {
          this.init(result);
        },
        error => console.log("Error :: " + error)
      )
  }

  init(instruction: Instruction) {
    this.instruction = instruction;
    this.initResourceContent(instruction);
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

    var l;
    this.userService.updateInformationCount(this.user.id, this.knowledgeCount, this.instruction.instructionType);
    this.snackBar.open("Danke " + this.user.userName + "! Die Arbeitsanweisung wurde abgeschlossen.", "", {
      duration: 2000,
    });
    this.knowledgeCount = new Array()

  }
  showFile(resource: Resource, index: number) {
    if (resource != null) {
      this.instructionService.getResourceFile(resource.id).subscribe(data => {
        this.resourceContent[index] = data;
      });
    }
  }


  clickExpansionPanel(childStep: InstructionChildStep) {
    console.log(childStep.id);
  }


  isLayman(): boolean {
    if (this.instruction != null && this.instruction != undefined && this.user != null && this.user != undefined) {
      if (this.user.level[this.instruction.instructionType].level === "LAYMAN") {
        return true;
      }
    }
    return false;
  }
  isRookie(): boolean {
    if (this.instruction != null && this.instruction != undefined && this.user != null && this.user != undefined) {
      if (this.user.level[this.instruction.instructionType].level === "ROOKIE") {
        return true;
      }
    }
    return false;
  }
  isPro(): boolean {
    if (this.instruction != null && this.instruction != undefined && this.user != null && this.user != undefined) {
      if (this.user.level[this.instruction.instructionType].level === "PRO") {
        return true;
      }
    }
    return false;
  }

  increaseCount(): void {
    this.knowledgeCount.push(3);
  }

  decreaseCount(): void {
    this.knowledgeCount.push(-1);

  }

  hasResource(childStep: InstructionChildStep): boolean {
    if (childStep != null) {
      if (childStep.resource != null) {
        return true;
      }
    }
    return false;
  }
}
