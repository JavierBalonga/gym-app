import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ExerciseExecution } from '@/types';

import { useStore } from '../../../contexts/store';
import { useRoutine } from '../routine-context';
import { useRoutineExecution } from '../routine-execution-context';
import { useExercise } from './exercise-context';

const Context = createContext<ExerciseExecution | null>(null);

export interface ExerciseExecutionProviderProps {
  children: ReactNode;
}

export const ExerciseExecutionProvider = ({ children }: ExerciseExecutionProviderProps) => {
  const addExerciseExecution = useStore((s) => s.addExerciseExecution);

  const routine = useRoutine();
  const routineExecution = useRoutineExecution();
  const exercise = useExercise();

  const exerciseExecution = useMemo(() => {
    if (!routine || !routineExecution || !exercise) return null;
    const exerciseExecution = routineExecution.exercises.find((e) => e.exerciseId === exercise.id);
    if (exerciseExecution) return exerciseExecution;
    const newExerciseExecution: ExerciseExecution = {
      id: crypto.randomUUID(),
      exerciseId: exercise.id,
      sets: [],
    };
    addExerciseExecution(routine.id, routineExecution.id, newExerciseExecution);
    return newExerciseExecution;
  }, [routineExecution, exercise]);

  return <Context.Provider value={exerciseExecution}>{children}</Context.Provider>;
};

export const useExerciseExecution = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error('useExerciseExecution has to be inside a ExerciseExecutionProvider');
  }
  return context;
};
