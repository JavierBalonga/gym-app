import { useMemo, useState } from 'react';
import { useExercise } from '@/components/business/exercise-context';
import { useExerciseExecution } from '@/components/business/exercise-execution-context';
import { usePreviousExerciseExecution } from '@/components/business/previous-exercise-execution-context';
import { useRoutine } from '@/components/business/routine-context';
import { useRoutineExecution } from '@/components/business/routine-execution-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useStore } from '@/contexts/store';
import { Trash2 } from 'lucide-react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';

export default function ExecuteExercisePage() {
  const navigate = useNavigate();
  const removeSetExecution = useStore((s) => s.removeSetExecution);

  const [open, setOpen] = useState(true);

  const routine = useRoutine();
  const routineExecution = useRoutineExecution();
  const exercise = useExercise();
  const exerciseExecution = useExerciseExecution();
  const previousExerciseExecutionData = usePreviousExerciseExecution();

  const remainingSets = useMemo(() => {
    if (!exercise || !exerciseExecution) return null;
    return exercise.sets - exerciseExecution.sets.length;
  }, [exercise?.sets, exerciseExecution?.sets.length]);

  const handleRemoveSerie = (setId: string) => {
    if (!routine || !routineExecution || !exerciseExecution) return null;
    removeSetExecution(routine.id, routineExecution.id, exerciseExecution.id, setId);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  const handleFinish = () => {
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  if (!routine || !exercise) return <Navigate to=".." />;

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent>
          <div className="flex flex-row flex-wrap items-baseline justify-between gap-2 pt-6 text-foreground">
            <h3 className="text-2xl">{exercise?.name}</h3>
            <p>
              {exercise.sets}x{exercise.reps} {exercise.weight && `${exercise.weight}Kg`}
            </p>
          </div>
          <hr />
          {previousExerciseExecutionData && (
            <>
              <div className="flex flex-row flex-wrap items-baseline justify-between gap-2 text-foreground/50">
                <h4 className="text-md">Ejecucion anterior</h4>
                <p>
                  {previousExerciseExecutionData.sets}x{previousExerciseExecutionData.reps}{' '}
                  {previousExerciseExecutionData.weight &&
                    `${previousExerciseExecutionData.weight}Kg`}
                </p>
              </div>
              <hr />
            </>
          )}
          <div className="flex h-0 grow flex-col gap-2 overflow-auto px-4">
            {exerciseExecution?.sets.map((set, i) => (
              <Card key={set.id} className="flex flex-row items-center gap-3 py-2 pl-6 pr-2">
                <span>{i + 1} Serie</span>
                <div className="grow" />
                <span>
                  {set.reps}Reps {set.weight}Kg
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveSerie(set.id)}
                >
                  <Trash2 />
                </Button>
              </Card>
            ))}
          </div>
          {remainingSets !== null && remainingSets > 0 && (
            <p className="text-center text-foreground/50">
              {remainingSets === 1 ? 'Falta 1 Serie' : `Faltan ${remainingSets} Series`}
            </p>
          )}
          <div className="flex flex-col gap-2 pt-4">
            <Button type="button" variant="outline" className="w-full grow" onClick={handleFinish}>
              Finalizar Ejercicio
            </Button>
            <Button type="button" variant="default" className="w-full grow" asChild>
              <Link to={`/execute/${routine.id}/${exercise.id}/add-serie`}>Registrar Serie</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <Outlet />
    </>
  );
}
