import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Routine } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface RoutineCardProps {
  routine: Routine;
}

export default function RoutineCard({ routine }: RoutineCardProps) {
  return (
    <Card className="flex flex-row items-center gap-4 p-4">
      <div className="flex grow flex-col gap-2">
        <h5 className="text-xl font-bold">{routine.name}</h5>
        <p className="text-foreground/50">
          {routine.exercises.length} {routine.exercises.length === 1 ? 'Ejercicio' : 'Ejercicios'}
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Button type="button" variant="outline" size="icon" asChild>
          <Link to={`/edit/${routine.id}`}>
            <Pencil />
          </Link>
        </Button>
        <Button type="button" variant="outline" size="icon" asChild>
          <Link to={`/delete/${routine.id}`}>
            <Trash2 />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
