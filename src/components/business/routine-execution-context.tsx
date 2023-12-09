import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { useStore } from '@/contexts/store';
import { RoutineExecution } from '@/types';

import { useRoutine } from './routine-context';

const Context = createContext<RoutineExecution | null | 'NOT_INSIDE_PROVIDER'>(
  'NOT_INSIDE_PROVIDER',
);

export interface RoutineExecutionProviderProps {
  children: ReactNode;
}

export const RoutineExecutionProvider = ({ children }: RoutineExecutionProviderProps) => {
  const routine = useRoutine();

  const actualRoutineExecutionId = useStore((s) => s.actualRoutineExecutionId);

  const routineExecution = useMemo(() => {
    if (!routine || !actualRoutineExecutionId) return null;
    const routineExecution = routine.executions.find((e) => e.id === actualRoutineExecutionId);
    if (!routineExecution) return null;
    return routineExecution;
  }, [routine, actualRoutineExecutionId]);

  return <Context.Provider value={routineExecution}>{children}</Context.Provider>;
};

export const useRoutineExecution = () => {
  const context = useContext(Context);
  if (context === 'NOT_INSIDE_PROVIDER') {
    throw new Error('useRoutineExecution has to be inside a RoutineExecutionProvider');
  }
  return context;
};
