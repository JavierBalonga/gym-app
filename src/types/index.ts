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
  rest: number;
  comment: string;
}

export interface RoutineExecution {
  id: string;
  status: RoutineExecutionStatus;
  date: string;
  exercises: ExerciseExecution[];
}

export interface ExerciseExecution {
  id: string;
  exerciseId: string;
  date: string;
  sets: SetExecution[];
}

export interface SetExecution {
  id: string;
  date: string;
  reps: number;
  weight: number;
}

export enum RoutineExecutionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}
