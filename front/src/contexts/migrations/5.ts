import { V4Store } from './4';

export interface V5Store {
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

export function upgradeV5(store: V4Store): V5Store {
  const newStore: V5Store = {
    ...store,
    routines: store.routines.map((routine) => ({
      ...routine,
      executions: routine.executions.map((execution) => ({
        ...execution,
        status: 'COMPLETED',
        exercises: execution.exercises.map((exercise) => ({
          ...exercise,
          date: execution.date,
          sets: exercise.sets.map((set) => ({
            ...set,
            date: execution.date,
          })),
        })),
      })),
    })),
  };
  delete (newStore as any).actualRoutineExecutionId;
  return newStore;
}
