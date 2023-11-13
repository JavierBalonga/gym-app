import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';

import { ExcerciseFormValues } from './excercise-schema';

export interface ExerciseCardProps {
  exercise: ExcerciseFormValues;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onRemove: () => void;
}

export default function ExerciseCard({
  exercise,
  onMoveUp,
  onMoveDown,
  onEdit,
  onRemove,
}: ExerciseCardProps) {
  return (
    <Card className="flex flex-row items-center justify-between gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <Button type="button" variant="ghost" size="icon" onClick={onMoveUp}>
          <ChevronUp />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={onMoveDown}>
          <ChevronDown />
        </Button>
      </div>

      <span>{exercise.id}</span>
      <div className="grow" />
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