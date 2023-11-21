import { useMemo, useState } from 'react';
import Section from '@/components/business/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WheelInput, WheelInputContent, WheelInputItem } from '@/components/ui/wheel-input';
import { useStore } from '@/contexts/store';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function RunPage() {
  const params = useParams<{ id: string; exerciseIndex: string }>();
  const navigate = useNavigate();
  const routines = useStore((s) => s.routines);

  const [series, setSeries] = useState<{ weight: number; reps: number }[]>([]);
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const exerciseIndex = useMemo(() => {
    const exerciseIndex = Number(params.exerciseIndex);
    if (isNaN(exerciseIndex)) return navigate('..');
    return exerciseIndex;
  }, [params.exerciseIndex]);

  const routine = useMemo(() => {
    const routine = routines.find((r) => r.id === params.id);
    if (!routine) return navigate('..');
    return routine;
  }, [params.id, routines]);

  const exercise = useMemo(() => {
    if (!exerciseIndex) return navigate('..');
    const exercise = routine?.exercises[exerciseIndex - 1];
    if (!exercise) return navigate('..');
    setWeight(exercise.weight);
    setReps(exercise.reps);
    return exercise;
  }, [exerciseIndex, routine]);

  const handleAddSerie = () => {
    setSeries((series) => series.concat({ weight, reps }));
  };

  const handleRemoveSerie = (index: number) => {
    setSeries((series) => series.filter((_, i) => i !== index));
  };

  const remainingSets = useMemo(() => {
    if (!exercise) return null;
    return exercise.sets - series.length;
  }, [exercise?.sets, series.length]);

  if (!routine || !exercise) return null;

  return (
    <Section className="gap-3">
      <h2 className="text-4xl font-bold">{routine?.name}</h2>
      <hr />
      <div className="flex flex-row flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-2xl">{exercise?.name}</h3>
        <p className="text-foreground/50">
          {exercise.sets}x{exercise.reps} {exercise.weight && `${exercise.weight}Kg`}
        </p>
      </div>
      <hr />
      <div className="flex h-0 grow flex-col gap-2 overflow-auto px-4">
        {series.map((serie, i) => (
          <Card key={i} className="flex flex-row items-center gap-3 py-2 pl-6 pr-2">
            <span>{i + 1} Serie</span>
            <div className="grow" />
            <span>
              {serie.reps}Reps {serie.weight}Kg
            </span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handleRemoveSerie(i)}
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
        <WheelInput<number> value={weight} onChange={setWeight}>
          <WheelInputContent>
            {Array.from({ length: 200 }, (_, i) => (
              <WheelInputItem key={i} value={i / 2} />
            ))}
          </WheelInputContent>
        </WheelInput>
        <WheelInput<number> value={reps} onChange={setReps}>
          <WheelInputContent>
            {Array.from({ length: 99 }, (_, i) => (
              <WheelInputItem key={i} value={i + 1} />
            ))}
          </WheelInputContent>
        </WheelInput>
      </div>
      <div className="flex flex-row gap-2 pt-4">
        {exerciseIndex && exerciseIndex > 1 ? (
          <Button type="button" variant="outline" size="icon" asChild>
            <Link to={`/run/${params.id}/${exerciseIndex - 1}`}>
              <ChevronUp />
            </Link>
          </Button>
        ) : (
          <Button type="button" variant="outline" size="icon" asChild disabled>
            <ChevronUp />
          </Button>
        )}
        {exerciseIndex && exerciseIndex < routine.exercises.length ? (
          <Button type="button" variant="outline" size="icon" asChild>
            <Link to={`/run/${params.id}/${exerciseIndex + 1}`}>
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
