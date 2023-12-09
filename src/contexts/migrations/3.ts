import { V2Store } from './2';

export interface V3Store {
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

export function upgradeV3(store: V2Store): V3Store {
  return {
    routines: store.routines.map((routine) => ({
      ...routine,
      executions: routine.executions.map((execution) => ({
        ...execution,
        date: new Date().toISOString(),
      })),
    })),
  };
}
