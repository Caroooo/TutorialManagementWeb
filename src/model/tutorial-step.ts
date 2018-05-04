import { TutorialChildStep } from "./tutorial-child-step";

export class TutorialStep {
    id: number;
    titel: string;
    shortDescription: string;
    tutorialChildSteps: TutorialChildStep[];
  }
