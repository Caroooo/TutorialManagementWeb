import { TutorialChildStepCreateView } from "./tutorial-child-step-create-view";

export class TutorialStepCreateView {
    titel: string;
    shortDescription: string;
    tutorialChildSteps: TutorialChildStepCreateView[];

    public toString() : string{
      console.log("using custom to string funktion for  step");
      let result =  "{\"titel\": \""+ this.titel +"\", \"shortDescription\": \""+this.shortDescription +"\", \"tutorialChildSteps\": [";
      console.log(this.tutorialChildSteps);
      let childsteps = "";
      for(let s of this.tutorialChildSteps){
        childsteps = childsteps + s.toString();
      }
      result = result + childsteps + "]}";
      console.log(result);
      return result;
    }

    public toJSON(){
      console.log("custom toJSON used for step");
    console.log(this.tutorialChildSteps);
      return {titel: this.titel, shortDescription : this.shortDescription, tutorialChildSteps: this.tutorialChildSteps};
    }
  }
