import Section from '@/components/business/section';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useStore } from '@/contexts/store';
import { Pencil, Trash2 } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

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
              <Card key={routine.id} className="flex flex-row items-center gap-4 p-4">
                <div className="flex grow flex-col gap-2">
                  <h5 className="text-xl font-bold">{routine.name}</h5>
                  <p className="text-foreground/50">
                    {routine.exercises.length}{' '}
                    {routine.exercises.length === 1 ? 'Ejercicio' : 'Ejercicios'}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button type="button" variant="outline" size="icon" asChild>
                    <Link to={`/edit/${routine.id}`}>
                      <Pencil />
                    </Link>
                  </Button>
                  <Button type="button" variant="outline" size="icon" asChild>
                    <Link to={`/delete/${routine.id}`}>
                      <Trash2 />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </>
        )}
        <Button className="w-full" asChild>
          <Link to="/create">Crear Nueva Rutina</Link>
        </Button>
      </div>
      <Outlet />
    </Section>
  );
}
