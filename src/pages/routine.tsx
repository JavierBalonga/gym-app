import RoutineForm from '@/components/business/routine-form/routine-form';
import Section from '@/components/business/section';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateRoutinePage() {
  const navigate = useNavigate();

  return (
    <Section className="gap-16">
      <div className="flex flex-row items-center gap-4">
        <Button size="icon" variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
        <h1 className="text-3xl font-bold">Nueva Rutina</h1>
      </div>
      <RoutineForm />
    </Section>
  );
}
