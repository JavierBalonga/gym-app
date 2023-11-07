export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  comment: string;
}

export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
}
