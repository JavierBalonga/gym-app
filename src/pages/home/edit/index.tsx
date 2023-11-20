import { useMemo, useState } from 'react';
import RoutineForm from '@/components/business/routine-form/routine-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useStore } from '@/contexts/store';
import { Routine } from '@/types';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const routines = useStore((s) => s.routines);
  const updateRoutine = useStore((s) => s.updateRoutine);
  const [open, setOpen] = useState(true);

  const routine = useMemo(() => {
    const routine = routines.find((r) => r.id === id);
    if (!routine) navigate('..');
    return routine;
  }, [id, routines]);

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  const handleSubmit = (routine: Routine) => {
    updateRoutine(routine);
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Rutina</SheetTitle>
        </SheetHeader>
        <RoutineForm defaultValues={routine} onSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
}
