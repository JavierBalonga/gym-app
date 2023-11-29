import { useEffect, useMemo, useState } from 'react';
import Section from '@/components/business/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WheelInput, WheelInputContent, WheelInputItem } from '@/components/ui/wheel-input';
import { useStore } from '@/contexts/store';
import { ExerciseExecution, RoutineExecution } from '@/types';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

export default function ExecuteExercisePage() {
  const params = useParams<{ routineId: string; exerciseId: string }>();
  const routines = useStore((s) => s.routines);
  const actualRoutineExecutionId = useStore((s) => s.actualRoutineExecutionId);
  const setActualRoutineExecutionId = useStore((s) => s.setActualRoutineExecutionId);
  const addRoutineExecution = useStore((s) => s.addRoutineExecution);
  const addExerciseExecution = useStore((s) => s.addExerciseExecution);
  const addSetExecution = useStore((s) => s.addSetExecution);
  const removeSetExecution = useStore((s) => s.removeSetExecution);

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

  const prevExerciseId = useMemo(() => {
    if (!routine) return null;
    const exerciseIndex = routine.exercises.findIndex((e) => e.id === params.exerciseId);
    if (exerciseIndex === -1) return null;
    const prevExercise = routine?.exercises[exerciseIndex - 1];
    if (!prevExercise) return null;
    return prevExercise.id;
  }, [params.exerciseId, routine]);

  const nextExerciseId = useMemo(() => {
    if (!routine) return null;
    const exerciseIndex = routine.exercises.findIndex((e) => e.id === params.exerciseId);
    if (exerciseIndex === -1) return null;
    const prevExercise = routine?.exercises[exerciseIndex + 1];
    if (!prevExercise) return null;
    return prevExercise.id;
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

  const remainingSets = useMemo(() => {
    if (!exercise || !exerciseExecution) return null;
    return exercise.sets - exerciseExecution.sets.length;
  }, [exercise?.sets, exerciseExecution?.sets.length]);

  useEffect(() => {
    if (actualRoutineExecutionId === null) {
      setActualRoutineExecutionId(crypto.randomUUID());
    }
  }, [actualRoutineExecutionId]);

  useEffect(() => {
    if (!exercise || !exerciseExecution) return;
    const lastSet = exerciseExecution.sets[exerciseExecution?.sets.length - 1];
    setWeight(lastSet?.weight || exercise.weight);
    setReps(lastSet?.reps || exercise.reps);
  }, [exercise]);

  const handleAddSerie = () => {
    if (!routine || !routineExecution || !exerciseExecution || weight === null || reps === null)
      return null;
    addSetExecution(routine.id, routineExecution.id, exerciseExecution.id, {
      id: crypto.randomUUID(),
      weight,
      reps,
    });
  };

  const handleRemoveSerie = (setId: string) => {
    if (!routine || !routineExecution || !exerciseExecution) return null;
    removeSetExecution(routine.id, routineExecution.id, exerciseExecution.id, setId);
  };

  if (!routine || !exercise) return <Navigate to=".." />;

  return (
    <Section className="gap-3">
      <div className="flex flex-row flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-2xl">{exercise?.name}</h3>
        <p className="text-foreground/50">
          {exercise.sets}x{exercise.reps} {exercise.weight && `${exercise.weight}Kg`}
        </p>
      </div>
      <hr />
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
      <div className="flex flex-row gap-2 pt-4">
        {prevExerciseId ? (
          <Button type="button" variant="outline" size="icon" asChild>
            <Link to={`/execute/${params.routineId}/${prevExerciseId}`}>
              <ChevronUp />
            </Link>
          </Button>
        ) : (
          <Button type="button" variant="outline" size="icon" asChild disabled>
            <ChevronUp />
          </Button>
        )}
        {nextExerciseId ? (
          <Button type="button" variant="outline" size="icon" asChild>
            <Link to={`/execute/${params.routineId}/${nextExerciseId}`}>
              <ChevronDown />
            </Link>
          </Button>
        ) : (
          <Button type="button" variant="outline" size="icon" asChild disabled>
            <ChevronDown />
          </Button>
        )}
        <Button type="button" variant="default" className="w-full grow" onClick={handleAddSerie}>
          Agregar Serie
        </Button>
      </div>
    </Section>
  );
}
