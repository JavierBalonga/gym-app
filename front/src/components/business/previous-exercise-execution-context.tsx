import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ExerciseExecution, RoutineExecutionStatus } from '@/types';

import { useExercise } from './exercise-context';
import { useRoutine } from './routine-context';

const Context = createContext<ExerciseExecution | null | 'NOT_INSIDE_PROVIDER'>(
  'NOT_INSIDE_PROVIDER',
);

export interface PreviousExerciseExecutionProviderProps {
  children: ReactNode;
}

export const PreviousExerciseExecutionProvider = ({
  children,
}: PreviousExerciseExecutionProviderProps) => {
  const routine = useRoutine();
  const exercise = useExercise();

  const previousExerciseExecution = useMemo(() => {
    if (!routine || !exercise) return null;
    const actualRoutineExecutionIndex = routine.executions.findIndex(
      (e) => e.status === RoutineExecutionStatus.IN_PROGRESS,
    );
    if (actualRoutineExecutionIndex === -1) return null;
    const previousRoutineExecution = routine.executions[actualRoutineExecutionIndex - 1];
    if (!previousRoutineExecution) return null;
    const previousExerciseExecution = previousRoutineExecution.exercises.find(
      (e) => e.exerciseId === exercise.id,
    );
    return previousExerciseExecution || null;
  }, [routine, exercise]);

  return <Context.Provider value={previousExerciseExecution}>{children}</Context.Provider>;
};

export const usePreviousExerciseExecution = () => {
  const context = useContext(Context);
  if (context === 'NOT_INSIDE_PROVIDER') {
    throw new Error(
      'usePreviousExerciseExecution has to be inside a PreviousExerciseExecutionProvider',
    );
  }
  return context;
};
