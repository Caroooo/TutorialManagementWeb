import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { InstructionService } from '../../services/instruction-service'
import { Instruction } from '../../model/instruction';
import { Resource } from '../../model/resource';
import { ResourceType } from '../../model/resource-type';
import { MatStepper, MatSnackBar } from '@angular/material';
import { InstructionStep } from '../../model/instruction-step';
import { Observable } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { InstructionChildStep } from '../../model/instruction-child-step';
import { VideoComponent } from '../video/video.component';


@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @ViewChild('stepper') stepper;
  @Input() instructionInput: Instruction;

  stepStates: boolean[];
  stepsInitializied: boolean = false;
  resourceContent: string[] = new Array();
  resources: Resource[];
  instruction: Instruction;


  constructor(private domSanitizer: DomSanitizer, private _formBuilder: FormBuilder, private instructionService: InstructionService, public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    //this.getInstructionById(1);
    this.init(this.instructionInput);

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
    if (instruction.steps != null) {
      var length: number = instruction.steps.length;

      //calc absolut number of childsteps
      var absolut: number = length;
      for (i = 0; i < length; i++) {
        if (instruction.steps[i].instructionChildSteps != null) {
          absolut = absolut + instruction.steps[i].instructionChildSteps.length;
        }
      }
      //fill in resources in resources array
      this.resources = new Array(absolut);
      var j: number;
      var g: number = 0;
      while (g < this.resources.length) {
        for (i = 0; i < length; i++) {
          if (instruction.steps[i].instructionChildSteps != null) {
            for (j = 0; j < instruction.steps[i].instructionChildSteps.length; j++) {
              this.resources[g] = instruction.steps[i].instructionChildSteps[j].resource;
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


  getInstructionById(id: number): void {
    this.instructionService.getInstructionById(id).subscribe(
      resultArray => this.init(resultArray),
      error => console.log("Error :: " + error)
    )
  }

  init(instruction: Instruction) {
    this.instruction = instruction;
   // this.initResourceContent(instruction);
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
    this.snackBar.open("Danke! Das Instruction wurde abgeschlossen.","", {
      duration: 2000,
    });
  }
  showFile(resource: Resource, index: number) {
    if (resource != null) {
      this.instructionService.getResourceFile(resource.id).subscribe(data => {
        this.resourceContent[index] = data;
      });
    }
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
