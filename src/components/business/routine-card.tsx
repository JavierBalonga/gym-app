import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex grow flex-col items-start">
              <h5 className="text-2xl font-bold">{routine.name}</h5>
              <p className="text-foreground/50">
                {routine.exercises.length}{' '}
                {routine.exercises.length === 1 ? 'Ejercicio' : 'Ejercicios'}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <ul className="flex list-decimal flex-col gap-1 pl-6">
              {routine.exercises.map((exercise) => (
                <li key={exercise.id}>
                  <h5 className="text-lg">{exercise.name}</h5>
                  <p className="text-foreground/50">
                    {exercise.sets}x{exercise.reps} {exercise.weight && `${exercise.weight}Kg`}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex flex-row gap-2 pt-4">
              <Button type="button" variant="outline" size="icon" asChild>
                <Link to={`/delete/${routine.id}`}>
                  <Trash2 />
                </Link>
              </Button>
              <Button type="button" variant="outline" size="icon" asChild>
                <Link to={`/edit/${routine.id}`}>
                  <Pencil />
                </Link>
              </Button>
              {Boolean(routine.exercises.length) && (
                <Button type="button" variant="default" className="w-full grow" asChild>
                  <Link to={`/execute/${routine.id}/${routine.exercises[0].id}`}>
                    Empezar Rutina
                  </Link>
                </Button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}

{
  /* <div className="flex flex-col items-center gap-2">
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
</div> */
}
