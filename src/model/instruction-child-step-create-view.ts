
export class InstructionChildStepCreateView {
    titel: string;
    description: string;
    resourceId: number;

    
    public toString() : string {
      console.log("using custom to string funktion for child step");
      return "{\"titel\": \""+this.titel+"\", \"description\": \""+this.description+"\", \"resourceId\" : \""+this.resourceId +"\"}";
    }

    public toJSON(){
      console.log("custom toJSON used for child");
      return {titel: this.titel, description: this.description, resourceId: this.resourceId};
    }
  }
