import RoutineForm from '@/components/business/routine-form/routine-form';
import Section from '@/components/business/section';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '../contexts/store';

export default function CreateRoutinePage() {
  const navigate = useNavigate();

  const addRoutine = useStore((s) => s.addRoutine);

  return (
    <Section className="gap-8">
      <div className="flex flex-row items-center gap-4">
        <Button size="icon" variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
        <h1 className="text-3xl font-bold">Nueva Rutina</h1>
      </div>
      <RoutineForm
        onSubmit={(routine) => {
          addRoutine(routine);
          navigate(-1);
        }}
      />
    </Section>
  );
}
