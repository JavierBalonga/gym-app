import { Button } from '@/components/ui/button';
import { useFieldArray } from 'react-hook-form';

import ExerciseCard from './exercise-card';
import { RoutineFormValues } from './routineform-schema';

export default function ExercisesField() {
  const {
    fields: exercises,
    append,
    remove,
    swap,
  } = useFieldArray<RoutineFormValues>({
    name: 'exercises',
    keyName: 'id',
  });

  const handleAddExercise = () => {
    append({
      id: crypto.randomUUID(),
      name: '',
      sets: 0,
      reps: 0,
      weight: 0,
      comment: '',
    });
  };

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
      <Button type="button" onClick={handleAddExercise}>
        Agregar Ejercicio
      </Button>
    </>
  );
}
