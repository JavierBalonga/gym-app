import { V5Store } from './5';

export interface V6Store {
  routines: {
    id: string;
    name: string;
    exercises: {
      id: string;
      name: string;
      sets: number;
      reps: number;
      weight: number;
      rest: number;
      comment: string;
    }[];
    executions: {
      id: string;
      status: 'IN_PROGRESS' | 'COMPLETED';
      date: string;
      exercises: {
        id: string;
        date: string;
        sets: {
          id: string;
          date: string;
          reps: number;
          weight: number;
        }[];
      }[];
    }[];
  }[];
}

export function upgradeV6(store: V5Store): V6Store {
  const newStore: V6Store = {
    ...store,
    routines: store.routines.map((routine) => ({
      ...routine,
      exercises: routine.exercises.map((exercise) => ({
        ...exercise,
        rest: 120000, // 2 minutes
      })),
    })),
  };
  delete (newStore as any).actualRoutineExecutionId;
  return newStore;
}
