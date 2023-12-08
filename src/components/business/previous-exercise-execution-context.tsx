import { createContext, ReactNode, useContext, useMemo } from 'react';

import { useStore } from '../../contexts/store';
import round from '../../lib/round';
import { useExercise } from './exercise-context';
import { useRoutine } from './routine-context';

export interface PreviousExerciseExecutionData {
  sets: number;
  weight: number;
  reps: number;
}

const Context = createContext<PreviousExerciseExecutionData | null>(null);

export interface PreviousExerciseExecutionProviderProps {
  children: ReactNode;
}

export const PreviousExerciseExecutionProvider = ({
  children,
}: PreviousExerciseExecutionProviderProps) => {
  const actualRoutineExecutionId = useStore((s) => s.actualRoutineExecutionId);

  const routine = useRoutine();
  const exercise = useExercise();

  const previousExerciseExecutionData = useMemo(() => {
    if (!routine || !actualRoutineExecutionId || !exercise) return null;
    const actualRoutineExecutionIndex = routine.executions.findIndex(
      (e) => e.id === actualRoutineExecutionId,
    );
    if (actualRoutineExecutionIndex === -1) return null;
    const previousRoutineExecution = routine.executions[actualRoutineExecutionIndex - 1];
    if (!previousRoutineExecution) return null;
    const previousExerciseExecution = previousRoutineExecution.exercises.find(
      (e) => e.exerciseId === exercise.id,
    );
    if (!previousExerciseExecution) return null;
    const sets = previousExerciseExecution.sets.length;
    let totalWeight = 0;
    let totalReps = 0;
    previousExerciseExecution.sets.forEach((set) => {
      totalWeight += set.weight;
      totalReps += set.reps;
    });
    return {
      sets: sets,
      weight: round(totalWeight / sets, 0.5),
      reps: round(totalReps / sets),
    };
  }, [routine, actualRoutineExecutionId, exercise]);

  return <Context.Provider value={previousExerciseExecutionData}>{children}</Context.Provider>;
};

export const usePreviousExerciseExecution = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(
      'usePreviousExerciseExecution has to be inside a PreviousExerciseExecutionProvider',
    );
  }
  return context;
};
