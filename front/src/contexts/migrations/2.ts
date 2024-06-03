import { V1Store } from './1';

export interface V2Store {
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

export function upgradeV2(store: V1Store): V2Store {
  return {
    ...store,
    routines: store.routines.map((routine) => ({
      ...routine,
      executions: [],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      exercises: routine.exercises.map(({ executions, ...exercise }) => exercise),
    })),
  };
}
