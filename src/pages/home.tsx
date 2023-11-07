import { Link } from 'react-router-dom';

import Section from '../components/section';
import { Button } from '../components/ui/button';
import { useStore } from '../contexts/store';

export default function HomePage() {
  const routines = useStore((s) => s.routines);

  return (
    <Section>
      {routines.length === 0 ? (
        <div className="flex grow flex-col items-center justify-center gap-4">
          <div className="flex h-64 w-full items-center justify-center rounded-lg border border-dashed border-foreground">
            <p>¡Crea tu primera rutina!</p>
          </div>
          <Button className="w-full" asChild>
            <Link to="/routine">Crear Nueva Rutina</Link>
          </Button>
        </div>
      ) : (
        <>
          <h5 className="text-3xl font-bold">Rutinas</h5>
          <div className="flex flex-col">
            {routines.map((routine) => (
              <div key={routine.id}>{routine.name}</div>
            ))}
          </div>
          <div className="grow" />
          <Button className="w-full" asChild>
            <Link to="/routine">Crear Nueva Rutina</Link>
          </Button>
        </>
      )}
    </Section>
  );
}
