import { V6Store } from './6';

export interface V7Store {
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

export function upgradeV7(store: V6Store): V7Store {
  const newStore: V7Store = {
    ...store,
    routines: store.routines.map((routine) => ({
      ...routine,
      exercises: routine.exercises.map((exercise) => ({
        ...exercise,
        rest: exercise.rest || 120000, // 2 minutes
      })),
      executions:
        routine.executions?.map((execution) => ({
          ...execution,
          status: execution.status || 'COMPLETED',
          date: execution.date || new Date().toISOString(),
          exercises: execution.exercises.map((exercise) => ({
            ...exercise,
            date: exercise.date || execution.date || new Date().toISOString(),
            sets: exercise.sets.map((set) => ({
              ...set,
              date: set.date || exercise.date || execution.date || new Date().toISOString(),
            })),
          })),
        })) || [],
    })),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (newStore as any).actualRoutineExecutionId;
  return newStore;
}
