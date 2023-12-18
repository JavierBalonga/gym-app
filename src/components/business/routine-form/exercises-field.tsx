import { useState } from 'react';
import ArrayFormField from '@/components/form-fields/array-form-field';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';

import ExcerciseForm from './excercise-form';
import { RoutineFormValues } from './schemas';

export default function ExercisesField() {
  const [isCreating, setIsCreating] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  return (
    <ArrayFormField<RoutineFormValues, 'exercises'>
      name="exercises"
      keyName="id"
      render={({ fields: exercises, append, swap, update, remove }) => (
        <>
          <div className="-mx-3 flex h-0 grow flex-col gap-4 overflow-auto px-3">
            {exercises.map((exercise, i) => (
              <Card key={exercise.id} className="flex flex-row items-center gap-4 p-4">
                <div className="flex flex-col items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => swap(i, i - 1)}
                    disabled={i === 0}
                  >
                    <ChevronUp className="h-[1.2em] w-[1.2em]" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => swap(i, i + 1)}
                    disabled={i === exercises.length - 1}
                  >
                    <ChevronDown className="h-[1.2em] w-[1.2em]" />
                  </Button>
                </div>
                <div className="flex grow flex-col gap-2">
                  <h5 className="text-xl font-bold">{exercise.name}</h5>
                  <p className="text-foreground/50">
                    {exercise.sets}x{exercise.reps} {exercise.weight && `${exercise.weight}Kg`}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setEditIndex(i)}
                  >
                    <Pencil className="h-[1.2em] w-[1.2em]" />
                  </Button>
                  <Button type="button" variant="outline" size="icon" onClick={() => remove(i)}>
                    <Trash2 className="h-[1.2em] w-[1.2em]" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={() => setIsCreating(true)}>
            Agregar Ejercicio
          </Button>

          <Sheet
            open={isCreating || editIndex !== null}
            onOpenChange={(open) => {
              if (open) return;
              setIsCreating(false);
              setEditIndex(null);
            }}
          >
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{isCreating ? 'Nuevo Ejercicio' : 'Editar Ejercicio'}</SheetTitle>
              </SheetHeader>
              {isCreating && (
                <ExcerciseForm
                  onSubmit={(excercise) => {
                    append(excercise);
                    setIsCreating(false);
                  }}
                />
              )}
              {editIndex !== null && (
                <ExcerciseForm
                  defaultValues={exercises[editIndex]}
                  onSubmit={(excercise) => {
                    update(editIndex, excercise);
                    setEditIndex(null);
                  }}
                />
              )}
            </SheetContent>
          </Sheet>
        </>
      )}
    />
  );
}
