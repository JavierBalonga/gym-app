import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { WheelInput, WheelInputContent, WheelInputItem } from '@/components/ui/wheel-input';
import { useStore } from '@/contexts/store';
import round from '@/lib/round';
import { ExerciseExecution } from '@/types';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useRoutine } from '../../routine-context';
import { useRoutineExecution } from '../../routine-execution-context';
import { useExercise } from '../exercise-context';
import { useExerciseExecution } from '../exercise-execution-context';
import { usePreviousExerciseExecution } from '../previous-exercise-execution-context';

export default function AddSeriePage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const addSetExecution = useStore((s) => s.addSetExecution);

  const [weight, setWeight] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);

  const routine = useRoutine();
  const exercise = useExercise();
  const routineExecution = useRoutineExecution();
  const exerciseExecution = useExerciseExecution();
  const previousExerciseExecutionData = usePreviousExerciseExecution();

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  useEffect(() => {
    if (!exercise || !exerciseExecution) return;
    const lastSet = exerciseExecution.sets[exerciseExecution?.sets.length - 1];
    setWeight(lastSet?.weight || previousExerciseExecutionData?.weight || exercise.weight);
    setReps(lastSet?.reps || previousExerciseExecutionData?.reps || exercise.reps);
  }, [exercise]);

  const handleAddSerie = () => {
    if (!routine || !routineExecution || !exerciseExecution || weight === null || reps === null)
      return null;
    addSetExecution(routine.id, routineExecution.id, exerciseExecution.id, {
      id: crypto.randomUUID(),
      weight,
      reps,
    });
    navigate('..');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Serie</DialogTitle>
          <DialogDescription asChild>
            <div className="grid grid-cols-2">
              <span className="text-center">Peso</span>
              <span className="text-center">Repeticiones</span>
              <WheelInput<number> value={weight ?? 0} onChange={setWeight}>
                <WheelInputContent>
                  {Array.from({ length: 200 }, (_, i) => (
                    <WheelInputItem key={i} value={i / 2} />
                  ))}
                </WheelInputContent>
              </WheelInput>
              <WheelInput<number> value={reps ?? 0} onChange={setReps}>
                <WheelInputContent>
                  {Array.from({ length: 99 }, (_, i) => (
                    <WheelInputItem key={i} value={i + 1} />
                  ))}
                </WheelInputContent>
              </WheelInput>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2">
          <Button variant="outline" asChild>
            <Link to="..">Cancelar</Link>
          </Button>
          <Button onClick={handleAddSerie}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
