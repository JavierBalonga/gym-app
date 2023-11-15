import * as z from 'zod';

import { excerciseSchema } from './excercise-schema';

export const routineformSchema = z.object({
  id: z.string().uuid(),

  name: z
    .string()
    .min(1, {
      message: 'El nombre no puede estar vacío.',
    })
    .max(50, {
      message: 'El nombre debe tener como máximo 50 caracteres.',
    }),

  exercises: z.array(excerciseSchema).min(1, 'Debe haber al menos un ejercicio.'),
});

export type RoutineFormValues = z.infer<typeof routineformSchema>;
