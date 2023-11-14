import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useFieldArray } from 'react-hook-form';

import ExcerciseForm from './excercise-form';
import ExerciseCard from './exercise-card';
import { RoutineFormValues } from './routineform-schema';

export default function ExercisesField() {
  const [createOpen, setCreateOpen] = useState(false);

  const {
    fields: exercises,
    remove,
    swap,
    append,
  } = useFieldArray<RoutineFormValues>({
    name: 'exercises',
    keyName: 'id',
  });

  return (
    <>
      {exercises.map((exercise, i) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          disableUp={i === 0}
          onMoveUp={() => swap(i, i - 1)}
          disableDown={i === exercises.length - 1}
          onMoveDown={() => swap(i, i + 1)}
          onEdit={() => {}}
          onRemove={() => remove(i)}
        />
      ))}
      <Dialog onOpenChange={setCreateOpen} open={createOpen}>
        <DialogTrigger asChild>
          <Button type="button">Agregar Ejercicio</Button>
        </DialogTrigger>
        <DialogContent className="h-screen max-w-none sm:h-fit sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">Nuevo Ejercicio</DialogTitle>
          </DialogHeader>
          <ExcerciseForm
            onSubmit={(excercise) => {
              append(excercise);
              setCreateOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
