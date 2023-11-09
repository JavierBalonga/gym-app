import { MouseEvent, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { GripVertical, Pencil, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'El nombre no puede estar vacío.',
    })
    .max(50, {
      message: 'El nombre debe tener como máximo 50 caracteres.',
    }),

  exercises: z
    .array(
      z.object({
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
      }),
    )
    .min(1, 'Debe haber al menos un ejercicio.'),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  name: '',
  exercises: [],
};

export default function RoutineForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Mi Rutina..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ExercisesField />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const ExercisesField = () => {
  const {
    fields: exercises,
    append,
    remove,
    move,
  } = useFieldArray<FormValues>({
    name: 'exercises',
  });

  const handleAddExercise = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    append({
      id: crypto.randomUUID(),
      name: '',
      sets: 0,
      reps: 0,
      weight: 0,
      comment: '',
    });
  };

  const draggedId = useRef<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    if (!card) return;
    card.style.setProperty('opacity', '0.5');
    draggedId.current = id;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.preventDefault();
    if (draggedId.current === id) return;
    const draggedIndex = exercises.findIndex((e) => e.id === draggedId.current!);
    const draggedOverIndex = exercises.findIndex((e) => e.id === id!);
    move(draggedIndex, draggedOverIndex);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    if (!card) return;
    card.style.removeProperty('opacity');
  };

  return (
    <>
      {exercises.map((exercise, i) => (
        <Card
          key={exercise.id}
          className="flex flex-row items-center justify-between gap-4 p-4"
          onDragStart={(e) => handleDragStart(e, exercise.id)}
          onDragOver={(e) => handleDragOver(e, exercise.id)}
          onDragEnd={handleDragEnd}
          draggable
        >
          <GripVertical />
          <span>{exercise.id}</span>
          <div className="grow" />
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
          <Button variant="outline" size="icon" onClick={() => remove(i)}>
            <Trash2 />
          </Button>
        </Card>
      ))}
      <Button onClick={handleAddExercise}>Agregar Ejercicio</Button>
    </>
  );
};
