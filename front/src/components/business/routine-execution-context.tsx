import { createContext, ReactNode, useContext, useMemo } from 'react';
import { RoutineExecution, RoutineExecutionStatus } from '@/types';

import { useRoutine } from './routine-context';

const Context = createContext<RoutineExecution | null | 'NOT_INSIDE_PROVIDER'>(
  'NOT_INSIDE_PROVIDER',
);

export interface RoutineExecutionProviderProps {
  children: ReactNode;
}

export const RoutineExecutionProvider = ({ children }: RoutineExecutionProviderProps) => {
  const routine = useRoutine();

  const routineExecution = useMemo(() => {
    if (!routine) return null;
    const routineExecution = routine.executions.find(
      (e) => e.status === RoutineExecutionStatus.IN_PROGRESS,
    );
    if (!routineExecution) return null;
    return routineExecution;
  }, [routine]);

  return <Context.Provider value={routineExecution}>{children}</Context.Provider>;
};

export const useRoutineExecution = () => {
  const context = useContext(Context);
  if (context === 'NOT_INSIDE_PROVIDER') {
    throw new Error('useRoutineExecution has to be inside a RoutineExecutionProvider');
  }
  return context;
};
