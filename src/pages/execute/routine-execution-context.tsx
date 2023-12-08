import React, { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { RoutineExecution } from '@/types';
import { useParams } from 'react-router-dom';

import { useStore } from '../../contexts/store';
import { useRoutine } from './routine-context';

const Context = createContext<RoutineExecution | null>(null);

export interface RoutineExecutionProviderProps {
  children: ReactNode;
}

export const RoutineExecutionProvider = ({ children }: RoutineExecutionProviderProps) => {
  const routine = useRoutine();

  const actualRoutineExecutionId = useStore((s) => s.actualRoutineExecutionId);
  const setActualRoutineExecutionId = useStore((s) => s.setActualRoutineExecutionId);
  const addRoutineExecution = useStore((s) => s.addRoutineExecution);

  const routineExecution = useMemo(() => {
    if (!routine || !actualRoutineExecutionId) return null;
    const routineExecution = routine.executions.find((e) => e.id === actualRoutineExecutionId);
    if (routineExecution) return routineExecution;
    const newRoutineExecution: RoutineExecution = { id: actualRoutineExecutionId, exercises: [] };
    addRoutineExecution(routine.id, newRoutineExecution);
    return newRoutineExecution;
  }, [routine, actualRoutineExecutionId]);

  useEffect(() => {
    if (actualRoutineExecutionId === null) {
      setActualRoutineExecutionId(crypto.randomUUID());
    }
  }, [actualRoutineExecutionId]);

  return <Context.Provider value={routineExecution}>{children}</Context.Provider>;
};

export const useRoutineExecution = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error('useRoutineExecution has to be inside a RoutineExecutionProvider');
  }
  return context;
};
