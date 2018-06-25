import { InstructionChildStepCreateView } from "./instruction-child-step-create-view";

export class InstructionStepCreateView {
    titel: string;
    shortDescription: string;
    instructionChildSteps: InstructionChildStepCreateView[];

    public toString() : string{
      console.log("using custom to string funktion for  step");
      let result =  "{\"titel\": \""+ this.titel +"\", \"shortDescription\": \""+this.shortDescription +"\", \"instructionChildSteps\": [";
      console.log(this.instructionChildSteps);
      let childsteps = "";
      for(let s of this.instructionChildSteps){
        childsteps = childsteps + s.toString();
      }
      result = result + childsteps + "]}";
      console.log(result);
      return result;
    }

    public toJSON(){
      console.log("custom toJSON used for step");
    console.log(this.instructionChildSteps);
      return {titel: this.titel, shortDescription : this.shortDescription, instructionChildSteps: this.instructionChildSteps};
    }
  }
