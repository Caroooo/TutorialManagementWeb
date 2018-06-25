import { InstructionStepCreateView } from './instruction-step-create-view';

export class InstructionCreateView {
    titel: string;
    shortDescription: string;
    instructionType: string;
    steps: InstructionStepCreateView[];
   
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

  }
