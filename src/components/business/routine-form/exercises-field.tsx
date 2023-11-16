import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { set, useFieldArray, useFormContext } from 'react-hook-form';

import ExcerciseForm from './excercise-form';
import ExerciseCard from './exercise-card';
import { RoutineFormValues } from './routineform-schema';

export default function ExercisesField() {
  const {
    fields: exercises,
    remove,
    swap,
    append,
    update,
  } = useFieldArray<RoutineFormValues>({
    name: 'exercises',
    keyName: 'id',
  });

  const [isCreating, setIsCreating] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

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
          onEdit={() => setEditIndex(i)}
          onRemove={() => remove(i)}
        />
      ))}

      <Button type="button" variant="outline" onClick={() => setIsCreating(true)}>
        Agregar Ejercicio
      </Button>

      <Dialog
        open={isCreating}
        onOpenChange={(open) => {
          if (open) return;
          setIsCreating(false);
        }}
      >
        <DialogContent className="h-screen max-w-none sm:h-fit sm:max-w-lg">
          {isCreating && (
            <ExcerciseForm
              onSubmit={(excercise) => {
                append(excercise);
                setIsCreating(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={editIndex !== null}
        onOpenChange={(open) => {
          if (open) return;
          setEditIndex(null);
        }}
      >
        <DialogContent className="h-screen max-w-none sm:h-fit sm:max-w-lg">
          {editIndex !== null && (
            <ExcerciseForm
              defaultValues={exercises[editIndex]}
              onSubmit={(excercise) => {
                update(editIndex, excercise);
                setEditIndex(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
