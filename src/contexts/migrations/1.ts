export interface V0Store {
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
  }[];
}

export interface V1Store {
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
      executions: {
        id: string;
        sets: {
          reps: number;
          weight: number;
        }[];
      }[];
    }[];
  }[];
}

export function upgradeV1(store: V0Store): V1Store {
  return {
    routines: store.routines.map((routine) => ({
      ...routine,
      exercises: routine.exercises.map((exercise) => ({
        ...exercise,
        executions: [],
      })),
    })),
  };
}
