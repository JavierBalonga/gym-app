import { Routine } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import migrate from './migrations';

export interface Store {
  routines: Routine[];
  addRoutine: (routine: Routine) => void;
  removeRoutine: (id: string) => void;
  updateRoutine: (routine: Routine) => void;
}

export const useStore = create(
  persist<Store>(
    (set) => ({
      routines: [],
      addRoutine: (routine: Routine) => {
        set((state) => {
          return { routines: state.routines.concat(routine) };
        });
      },
      removeRoutine: (id: string) => {
        set((state) => {
          return { routines: state.routines.filter((r) => r.id !== id) };
        });
      },
      updateRoutine: (routine: Routine) => {
        set((state) => ({
          routines: state.routines.map((r) => (r.id === routine.id ? routine : r)),
        }));
      },
    }),
    {
      name: 'gym-storage',
      version: 1,
      migrate: migrate,
    },
  ),
);
