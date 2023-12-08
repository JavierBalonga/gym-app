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
import { ExerciseExecution, RoutineExecution } from '@/types';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AddSeriePage() {
  const params = useParams<{ routineId: string; exerciseId: string }>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const routines = useStore((s) => s.routines);
  const actualRoutineExecutionId = useStore((s) => s.actualRoutineExecutionId);
  const addRoutineExecution = useStore((s) => s.addRoutineExecution);
  const addExerciseExecution = useStore((s) => s.addExerciseExecution);
  const addSetExecution = useStore((s) => s.addSetExecution);

  const [weight, setWeight] = useState<number | null>(null);
  const [reps, setReps] = useState<number | null>(null);

  const routine = useMemo(() => {
    const routine = routines.find((r) => r.id === params.routineId);
    if (!routine) return null;
    return routine;
  }, [params.routineId, routines]);

  const exercise = useMemo(() => {
    if (!routine) return null;
    const exercise = routine.exercises.find((e) => e.id === params.exerciseId);
    if (!exercise) return null;
    return exercise;
  }, [params.exerciseId, routine]);

  const routineExecution = useMemo(() => {
    if (!routine || !actualRoutineExecutionId) return null;
    const routineExecution = routine.executions.find((e) => e.id === actualRoutineExecutionId);
    if (routineExecution) return routineExecution;
    const newRoutineExecution: RoutineExecution = { id: actualRoutineExecutionId, exercises: [] };
    addRoutineExecution(routine.id, newRoutineExecution);
    return newRoutineExecution;
  }, [routine, actualRoutineExecutionId]);

  const exerciseExecution = useMemo(() => {
    if (!routine || !routineExecution || !exercise) return null;
    const exerciseExecution = routineExecution.exercises.find((e) => e.exerciseId === exercise.id);
    if (exerciseExecution) return exerciseExecution;
    const newExerciseExecution: ExerciseExecution = {
      id: crypto.randomUUID(),
      exerciseId: exercise.id,
      sets: [],
    };
    addExerciseExecution(routine.id, routineExecution.id, newExerciseExecution);
    return newExerciseExecution;
  }, [routineExecution, exercise]);

  const previousExerciseExecutionData = useMemo(() => {
    if (!routine || !actualRoutineExecutionId || !exercise) return null;
    const actualRoutineExecutionIndex = routine.executions.findIndex(
      (e) => e.id === actualRoutineExecutionId,
    );
    if (actualRoutineExecutionIndex === -1) return null;
    const previousRoutineExecution = routine.executions[actualRoutineExecutionIndex - 1];
    if (!previousRoutineExecution) return null;
    const previousExerciseExecution = previousRoutineExecution.exercises.find(
      (e) => e.exerciseId === exercise.id,
    );
    if (!previousExerciseExecution) return null;
    const sets = previousExerciseExecution.sets.length;
    let totalWeight = 0;
    let totalReps = 0;
    previousExerciseExecution.sets.forEach((set) => {
      totalWeight += set.weight;
      totalReps += set.reps;
    });
    return {
      sets: sets,
      weight: round(totalWeight / sets, 0.5),
      reps: round(totalReps / sets),
    };
  }, [routine, actualRoutineExecutionId, exercise]);

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
          <DialogDescription className="grid grid-cols-2">
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
