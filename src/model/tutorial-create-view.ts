import { TutorialStepCreateView } from './tutorial-step-create-view';

export class TutorialCreateView {
    titel: string;
    shortDescription: string;
    steps: TutorialStepCreateView[];
   
   public toString(): string {
      let result = "{\"titel\": \""+this.titel+"\", \"shortDescription\": \""+this.shortDescription+"\", \"steps\": [";
      let steps = "";
      for(let s of this.steps){
        steps = steps + s.toString();
      }
      console.log(this.steps);
      result = result + steps + "]}";
      console.log(result);
      return result;
    }

    public toJSON(){
      console.log("custom toJSON user for tutorial");
      console.log(this.steps);
      return {titel: this.titel, shortDescription: this.shortDescription, steps: this.steps};
    }
  }
