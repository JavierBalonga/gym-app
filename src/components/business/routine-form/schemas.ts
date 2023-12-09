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

  weight: z.number().min(0, {
    message: 'El peso debe ser un número positivo.',
  }),

  comment: z.string().max(512, {
    message: 'El comentario debe tener como máximo 50 caracteres.',
  }),
});

export type ExcerciseFormValues = z.infer<typeof excerciseSchema>;

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

  exercises: z.array(excerciseSchema),

  executions: z.array(
    z.object({
      id: z.string().uuid(),

      date: z.string().datetime('La fecha de ejecución debe tener el formato YYYY-MM-DD HH:mm:ss'),

      exercises: z.array(
        z.object({
          id: z.string().uuid(),

          exerciseId: z.string().uuid(),

          sets: z.array(
            z.object({
              id: z.string().uuid(),

              reps: z
                .number()
                .int({
                  message: 'El número de repeticiones debe ser un número entero.',
                })
                .min(1, 'Debe haber al menos una repetición.'),

              weight: z.number().min(0, {
                message: 'El peso debe ser un número positivo.',
              }),
            }),
          ),
        }),
      ),
    }),
  ),
});

export type RoutineFormValues = z.infer<typeof routineformSchema>;
