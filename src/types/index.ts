export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  comment: string;
  executions: ExerciseExecution[];
}

export interface ExerciseExecution {
  id: string;
  sets: SetExecution[];
}

export interface SetExecution {
  reps: number;
  weight: number;
}
