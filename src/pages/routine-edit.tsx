import { useEffect, useMemo } from 'react';
import RoutineForm from '@/components/business/routine-form/routine-form';
import Section from '@/components/business/section';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import { useStore } from '../contexts/store';

export default function EditRoutinePage() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const routines = useStore((s) => s.routines);
  const updateRoutine = useStore((s) => s.updateRoutine);

  const routine = useMemo(() => routines.find((r) => r.id === id), [routines, id]);

  useEffect(() => {
    if (!routine) navigate('/404');
  });

  return (
    <Section className="gap-8">
      <div className="flex flex-row items-center gap-4">
        <Button size="icon" variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
        <h1 className="text-3xl font-bold">Editar Rutina</h1>
      </div>
      <RoutineForm
        defaultValues={routine}
        onSubmit={(routine) => {
          updateRoutine(routine);
          navigate(-1);
        }}
      />
    </Section>
  );
}
