import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Routine } from '../types';

export interface Store {
  routines: Routine[];
  addRoutine: (routine: Routine) => void;
  removeRoutine: (id: string) => void;
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
    }),
    { name: 'gym-storage' },
  ),
);
