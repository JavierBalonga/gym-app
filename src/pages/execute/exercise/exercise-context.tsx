import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { Exercise } from '@/types';
import { useParams } from 'react-router-dom';

import { useRoutine } from '../routine-context';

const Context = createContext<Exercise | null>(null);

export interface ExerciseProviderProps {
  children: ReactNode;
}

export const ExerciseProvider = ({ children }: ExerciseProviderProps) => {
  const params = useParams<{ exerciseId: string }>();

  const routine = useRoutine();

  const exercise = useMemo(() => {
    if (!routine) return null;
    const exercise = routine.exercises.find((e) => e.id === params.exerciseId);
    if (!exercise) return null;
    return exercise;
  }, [params.exerciseId, routine]);

  return <Context.Provider value={exercise}>{children}</Context.Provider>;
};

export const useExercise = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error('useExercise has to be inside a ExerciseProvider');
  }
  return context;
};
