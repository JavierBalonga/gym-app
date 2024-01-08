import { V3Store } from './3';

export interface V4Store {
  actualRoutineExecutionId: string | null;
  routines: {
    id: string;
    name: string;
    exercises: {
      id: string;
      name: string;
      sets: number;
      reps: number;
      weight: number;
      comment: string;
    }[];
    executions: {
      id: string;
      date: string;
      exercises: {
        id: string;
        sets: {
          id: string;
          reps: number;
          weight: number;
        }[];
      }[];
    }[];
  }[];
}

export function upgradeV4(store: V3Store): V4Store {
  return {
    ...store,
    routines: store.routines.map((routine) => ({
      ...routine,
      executions: routine.executions.map((execution) => ({
        ...execution,
        exercises: execution.exercises.filter((exercise) => exercise.sets.length > 0),
      })),
    })),
  };
}
