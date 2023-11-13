import * as z from 'zod';

export const excerciseSchema = z.object({
  id: z.string().uuid(),

  name: z
    .string()
    .min(1, {
      message: 'El nombre no puede estar vacío.',
    })
    .max(50, {
      message: 'El nombre debe tener como máximo 50 caracteres.',
    }),

  sets: z
    .number()
    .int({
      message: 'El número de series debe ser un número entero.',
    })
    .min(1, 'Debe haber al menos una serie.'),

  reps: z
    .number()
    .int({
      message: 'El número de repeticiones debe ser un número entero.',
    })
    .min(1, 'Debe haber al menos una repetición.'),

  weight: z.number().positive({
    message: 'El peso debe ser un número positivo.',
  }),

  comment: z.string().max(512, {
    message: 'El comentario debe tener como máximo 50 caracteres.',
  }),
});

export type ExcerciseFormValues = z.infer<typeof excerciseSchema>;
