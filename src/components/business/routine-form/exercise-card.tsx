import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';

import { ExcerciseFormValues } from './excercise-schema';

export interface ExerciseCardProps {
  exercise: ExcerciseFormValues;
  disableUp: boolean;
  onMoveUp: () => void;
  disableDown: boolean;
  onMoveDown: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

export default function ExerciseCard({
  exercise,
  disableUp,
  onMoveUp,
  disableDown,
  onMoveDown,
  onEdit,
  onRemove,
}: ExerciseCardProps) {
  return (
    <Card className="flex flex-row items-center gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Button type="button" variant="ghost" size="icon" onClick={onMoveUp} disabled={disableUp}>
          <ChevronUp />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onMoveDown}
          disabled={disableDown}
        >
          <ChevronDown />
        </Button>
      </div>
      <div className="flex grow flex-col gap-2">
        <h5 className="text-xl font-bold">{exercise.name}</h5>
        <p className="text-foreground/50">
          {exercise.sets} x {exercise.reps} {exercise.weight && `${exercise.weight}Kg`}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button type="button" variant="outline" size="icon" onClick={onEdit}>
          <Pencil />
        </Button>
        <Button type="button" variant="outline" size="icon" onClick={onRemove}>
          <Trash2 />
        </Button>
      </div>
    </Card>
  );
}
