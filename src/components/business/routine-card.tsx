import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/contexts/store';
import { Routine, RoutineExecution } from '@/types';
import { History, Pencil, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export interface RoutineCardProps {
  routine: Routine;
}

export default function RoutineCard({ routine }: RoutineCardProps) {
  const navigate = useNavigate();
  const actualRoutineExecutionId = useStore((s) => s.actualRoutineExecutionId);
  const setActualRoutineExecutionId = useStore((s) => s.setActualRoutineExecutionId);
  const addRoutineExecution = useStore((s) => s.addRoutineExecution);

  const handleStartRoutine = () => {
    if (actualRoutineExecutionId) {
      navigate(`/execute/${routine.id}`);
      return;
    }
    const routineExecutionId = crypto.randomUUID();
    setActualRoutineExecutionId(routineExecutionId);
    const newRoutineExecution: RoutineExecution = {
      id: routineExecutionId,
      date: new Date().toISOString(),
      exercises: [],
    };
    addRoutineExecution(routine.id, newRoutineExecution);
    navigate(`/execute/${routine.id}`);
  };

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
              <Button type="button" variant="outline" size="icon" asChild>
                <Link to={`/history/${routine.id}`}>
                  <History />
                </Link>
              </Button>
              {routine.exercises.length > 0 && (
                <Button
                  type="button"
                  variant="default"
                  className="w-full grow"
                  onClick={handleStartRoutine}
                >
                  Empezar Rutina
                </Button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
