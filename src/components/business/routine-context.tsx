import { createContext, ReactNode, useContext, useMemo } from 'react';
import { Routine } from '@/types';
import { useParams } from 'react-router-dom';

import { useStore } from '../../contexts/store';

const Context = createContext<Routine | null>(null);

export interface RoutineProviderProps {
  children: ReactNode;
}

export const RoutineProvider = ({ children }: RoutineProviderProps) => {
  const params = useParams<{ routineId: string }>();

  const routines = useStore((s) => s.routines);

  const routine = useMemo(() => {
    const routine = routines.find((r) => r.id === params.routineId);
    if (!routine) return null;
    return routine;
  }, [params.routineId, routines]);

  return <Context.Provider value={routine}>{children}</Context.Provider>;
};

export const useRoutine = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error('useRoutine has to be inside a RoutineProvider');
  }
  return context;
};
