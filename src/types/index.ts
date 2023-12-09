export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
  executions: RoutineExecution[];
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  comment: string;
}

export interface RoutineExecution {
  id: string;
  date: string;
  exercises: ExerciseExecution[];
}

export interface ExerciseExecution {
  id: string;
  exerciseId: string;
  sets: SetExecution[];
}

export interface SetExecution {
  id: string;
  reps: number;
  weight: number;
}
