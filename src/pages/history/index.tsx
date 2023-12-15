import { useRoutine } from '@/components/business/routine-context';
import Section from '@/components/business/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/contexts/store';
import formatDatetime from '@/lib/formatDatetime';
import round from '@/lib/round';
import { RoutineExecution, RoutineExecutionStatus } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import emptyHistoryIllustration from '@/assets/empty-history.svg';

export default function HistoryPage() {
  const navigate = useNavigate();
  const routine = useRoutine();
  const addRoutineExecution = useStore((s) => s.addRoutineExecution);

  const handleStartRoutine = () => {
    if (!routine) return;
    const routineExecutionId = uuid();
    const newRoutineExecution: RoutineExecution = {
      id: routineExecutionId,
      status: RoutineExecutionStatus.IN_PROGRESS,
      date: new Date().toISOString(),
      exercises: [],
    };
    addRoutineExecution(routine.id, newRoutineExecution);
    navigate(`/execute/${routine.id}`);
  };

  return (
    <Section className="gap-3">
      <h2 className="text-4xl font-bold">{routine?.name}</h2>
      <hr />
      <div className="flex grow flex-col-reverse justify-end gap-4">
        {!routine || routine.executions.length === 0 ? (
          <>
            <div className="flex flex-row gap-2">
              <Button type="button" variant="outline" className="w-full grow" asChild>
                <Link to="..">Volver</Link>
              </Button>
              {routine && routine.exercises.length > 0 && (
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
            <img className="h-64 w-full" src={emptyHistoryIllustration} alt="History Empty State" />
          </>
        ) : (
          routine.executions.map((execution) => (
            <Card key={execution.id} className="flex flex-row items-center gap-4 p-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <h5 className="text-xl font-bold">{formatDatetime(execution.date)}</h5>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-1">
                    <ul className="flex list-decimal flex-col gap-1 pl-6">
                      {execution.exercises.map((exerciseExecution) => {
                        const { sets, exerciseId } = exerciseExecution;
                        const exercise = routine.exercises.find((e) => e.id === exerciseId);
                        let totalWeight = 0;
                        let totalReps = 0;
                        sets.forEach((set) => {
                          totalWeight += set.weight;
                          totalReps += set.reps;
                        });
                        const avgWeight = sets.length
                          ? round(totalWeight / sets.length, 0.5)
                          : null;
                        const avgReps = sets.length ? round(totalReps / sets.length) : null;
                        return (
                          <li
                            key={exerciseExecution.id}
                            className="flex flex-row items-baseline justify-between gap-1"
                          >
                            <h5 className="text-lg">{exercise?.name}</h5>
                            <p className="text-foreground/50">
                              {sets.length
                                ? `${sets.length}x${avgReps} ${avgWeight && `${avgWeight}Kg`}`
                                : 'No hay ningún set'}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))
        )}
      </div>
    </Section>
  );
}

{
  /* <Card key={execution.id}>{formatDatetime(execution.date)}</Card> */
}
