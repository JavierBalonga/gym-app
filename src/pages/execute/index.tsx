import { useEffect, useMemo } from 'react';
import Section from '@/components/business/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/contexts/store';
import { cn } from '@/lib/utils';
import { RoutineExecution } from '@/types';
import { Check, Play } from 'lucide-react';
import { Link, Navigate, Outlet, useNavigate, useParams } from 'react-router-dom';

export default function ExecutePage() {
  const params = useParams<{ routineId: string }>();
  const navigate = useNavigate();
  const routines = useStore((s) => s.routines);
  const actualRoutineExecutionId = useStore((s) => s.actualRoutineExecutionId);
  const setActualRoutineExecutionId = useStore((s) => s.setActualRoutineExecutionId);
  const addRoutineExecution = useStore((s) => s.addRoutineExecution);

  const routine = useMemo(() => {
    const routine = routines.find((r) => r.id === params.routineId);
    if (!routine) return null;
    return routine;
  }, [params.routineId, routines]);

  const routineExecution = useMemo(() => {
    if (!routine || !actualRoutineExecutionId) return null;
    const routineExecution = routine.executions.find((e) => e.id === actualRoutineExecutionId);
    if (routineExecution) return routineExecution;
    const newRoutineExecution: RoutineExecution = { id: actualRoutineExecutionId, exercises: [] };
    addRoutineExecution(routine.id, newRoutineExecution);
    return newRoutineExecution;
  }, [routine, actualRoutineExecutionId]);

  useEffect(() => {
    if (actualRoutineExecutionId === null) {
      setActualRoutineExecutionId(crypto.randomUUID());
    }
  }, [actualRoutineExecutionId]);

  const isComplete = useMemo(() => {
    if (!routine || !routineExecution) return false;
    return routine.exercises.every((exercise) => {
      const exerciseExecution = routineExecution.exercises.find((e) => e.id === exercise.id);
      if (!exerciseExecution) return false;
      return exerciseExecution.sets.length === exercise.sets;
    });
  }, [routine?.exercises, routineExecution?.exercises]);

  const handleFinishRoutine = () => {
    // TODO: Show modal to confirm
    if (!routine || !routineExecution) return;
    setActualRoutineExecutionId(null);
    navigate('..');
  };

  if (!routine) return <Navigate to=".." />;

  return (
    <Section className="gap-3">
      <h2 className="text-4xl font-bold">{routine.name}</h2>
      <hr />
      <div className="-mx-3 flex h-0 grow flex-col gap-4 overflow-auto px-3">
        {routine.exercises.map((exercise) => {
          const exerciseExecution = routineExecution?.exercises.find(
            (e) => e.exerciseId === exercise.id,
          );
          const isComplete = exerciseExecution && exerciseExecution.sets.length >= exercise.sets;

          return (
            <Link key={exercise.id} to={`/execute/${routine.id}/${exercise.id}`}>
              <Card
                className={cn(
                  'flex flex-row items-center gap-4 px-6 py-4',
                  isComplete && 'border-success bg-success/5',
                )}
              >
                <div className="flex grow flex-col items-start">
                  <h5 className="text-2xl font-bold">{exercise.name}</h5>
                  <p className="text-foreground/50">
                    {exercise.sets}x{exercise.reps} {exercise.weight && `${exercise.weight}Kg`}
                  </p>
                </div>
                <Button type="button" variant="outline" size="icon">
                  {isComplete ? <Check /> : <Play />}
                </Button>
              </Card>
            </Link>
          );
        })}
      </div>
      <Button variant={isComplete ? 'default' : 'outline'} onClick={handleFinishRoutine}>
        Finalizar Rutina
      </Button>
      <Outlet />
    </Section>
  );
}
