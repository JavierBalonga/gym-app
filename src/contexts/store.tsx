import { ExerciseExecution, Routine, RoutineExecution, SetExecution } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import migrate from './migrations';

export interface Store {
  routines: Routine[];
  addRoutine: (routine: Routine) => void;
  removeRoutine: (id: string) => void;
  updateRoutine: (routine: Routine) => void;

  actualRoutineExecutionId: string | null;
  setActualRoutineExecutionId: (id: string | null) => void;

  addRoutineExecution: (routineId: string, routineExecution: RoutineExecution) => void;
  addExerciseExecution: (
    routineId: string,
    routineExecutionId: string,
    exerciseExecution: ExerciseExecution,
  ) => void;
  addSetExecution: (
    routineId: string,
    routineExecutionId: string,
    exerciseExecutionId: string,
    setExecution: SetExecution,
  ) => void;
  removeSetExecution: (
    routineId: string,
    routineExecutionId: string,
    exerciseExecutionId: string,
    setExecutionId: string,
  ) => void;
}

export const useStore = create(
  persist<Store>(
    (set) => ({
      routines: [],

      addRoutine: (routine) => {
        set((state) => {
          return { routines: state.routines.concat(routine) };
        });
      },

      removeRoutine: (id) => {
        set((state) => {
          return { routines: state.routines.filter((r) => r.id !== id) };
        });
      },

      updateRoutine: (routine) => {
        set((state) => ({
          routines: state.routines.map((r) => (r.id === routine.id ? routine : r)),
        }));
      },

      actualRoutineExecutionId: null,

      setActualRoutineExecutionId: (id) => {
        set(() => ({ actualRoutineExecutionId: id }));
      },

      addRoutineExecution: (routineId, routineExecution) => {
        console.log('addRoutineExecution', routineExecution.id);
        set((state) => ({
          routines: state.routines.map((routine) => {
            if (routine.id !== routineId) return routine;
            return {
              ...routine,
              executions: routine.executions.concat(routineExecution),
            };
          }),
        }));
      },

      addExerciseExecution: (routineId, routineExecutionId, exerciseExecution) => {
        set((state) => ({
          routines: state.routines.map((routine) => {
            if (routine.id !== routineId) return routine;
            return {
              ...routine,
              executions: routine.executions.map((execution) => {
                if (execution.id !== routineExecutionId) return execution;
                return {
                  ...execution,
                  exercises: execution.exercises.concat(exerciseExecution),
                };
              }),
            };
          }),
        }));
      },

      addSetExecution: (routineId, routineExecutionId, exerciseExecutionId, setExecution) => {
        set((state) => ({
          routines: state.routines.map((routine) => {
            if (routine.id !== routineId) return routine;
            return {
              ...routine,
              executions: routine.executions.map((routineExecution) => {
                if (routineExecution.id !== routineExecutionId) return routineExecution;
                return {
                  ...routineExecution,
                  exercises: routineExecution.exercises.map((exerciseExecution) => {
                    if (exerciseExecution.id !== exerciseExecutionId) return exerciseExecution;
                    return {
                      ...exerciseExecution,
                      sets: exerciseExecution.sets.concat(setExecution),
                    };
                  }),
                };
              }),
            };
          }),
        }));
      },

      removeSetExecution: (routineId, routineExecutionId, exerciseExecutionId, setExecutionId) => {
        set((state) => ({
          routines: state.routines.map((routine) => {
            if (routine.id !== routineId) return routine;
            return {
              ...routine,
              executions: routine.executions.map((routineExecution) => {
                if (routineExecution.id !== routineExecutionId) return routineExecution;
                return {
                  ...routineExecution,
                  exercises: routineExecution.exercises.map((exerciseExecution) => {
                    if (exerciseExecution.id !== exerciseExecutionId) return exerciseExecution;
                    return {
                      ...exerciseExecution,
                      sets: exerciseExecution.sets.filter((set) => set.id !== setExecutionId),
                    };
                  }),
                };
              }),
            };
          }),
        }));
      },
    }),
    {
      name: 'gym-storage',
      version: 4,
      migrate: migrate,
    },
  ),
);
