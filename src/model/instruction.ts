import {InstructionStep} from './instruction-step';
import { InstructionType } from './instruction-type';

export class Instruction {
    id: number;
    titel: string;
    instructionType: string;
    shortDescription: string;
    steps: InstructionStep[];
  }
