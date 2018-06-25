import { InstructionType } from "./instruction-type";
import { LevelMapping } from "./level-mapping";

export class User {
    id: number;
    userName: string;
    password: string;
    canRead: boolean;
    canWrite: boolean;
    isFirstVisit: boolean;
    level: Map<string, LevelMapping>;
  }