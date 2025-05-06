
export interface Resource {
  title: string;
  url: string;
  type: string;
}

export interface CurriculumDay {
  dayNumber: number;
  title: string;
  objectives: string[];
  resources: Resource[];
  assignment: string;
  completed: boolean;
}
