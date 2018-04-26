import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {TutorialService} from '../../services/tutorial-service'
import { Tutorial } from '../../model/tutorial';
import { Resource } from '../../model/resource';
import { ResourceType } from '../../model/resource-type';


@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  
 // firstFormGroup: FormGroup;
 // secondFormGroup: FormGroup;
  isLinear = true;
  stepOneState = false;
  stepTwoState = false;
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

getTutorialById(id : number): void{
  this.tutorialService.getTutorialById(id).subscribe(
    resultArray => this.tutorial = resultArray,
    error => console.log("Error :: " + error)
  )
}
  
  private myFunc(): void{
    console.log(this.stepTwoState);
    this.stepTwoState=true;
    console.log(this.stepTwoState);
  }

  ngOnInit() {
    this.getTutorialById(1);
    //this.getTutorials();
  }

  isImage(resource : Resource): boolean {
    if(resource != null){
      if(resource.resourceType === ResourceType.IMAGE){
        console.log("it is a image");
        this.getResource(resource);
        return true;
      }
    }
    return false;
  }

  getResource(resource : Resource): void{
    if(resource != null){
      this.tutorialService.getResource(resource.id).subscribe(
        resultArray => this.image = resultArray,
        error => console.log("Error :: " + error)
      )
      console.log("image loaded: " + this.image);
    }
  }


}
