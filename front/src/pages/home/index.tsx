import RoutineCard from '@/components/business/routine-card';
import Section from '@/components/business/section';
import { Button } from '@/components/ui/button';
import { useStore } from '@/contexts/store';
import { Link, Outlet } from 'react-router-dom';

import HelpFab from '../../components/business/help-fab';
import emptyRoutinesIllustration from '@/assets/empty-routines.svg';

export default function HomePage() {
  const routines = useStore((s) => s.routines);

  return (
    <Section className="gap-8">
      <h5 className="text-3xl font-bold">Rutinas</h5>
      <div className="flex grow flex-col gap-4">
        {routines.length === 0 ? (
          <img className="h-64 w-full" src={emptyRoutinesIllustration} alt="Routines Empty State" />
        ) : (
          <>
            {routines.map((routine) => (
              <RoutineCard key={routine.id} routine={routine} />
            ))}
          </>
        )}
        <Button className="w-full" asChild>
          <Link to="/create">Crear Nueva Rutina</Link>
        </Button>
      </div>
      <Outlet />
      <HelpFab />
    </Section>
  );
}
