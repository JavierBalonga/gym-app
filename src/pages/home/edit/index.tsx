import { useState } from 'react';
import { useRoutine } from '@/components/business/routine-context';
import RoutineForm from '@/components/business/routine-form/routine-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useStore } from '@/contexts/store';
import { Routine } from '@/types';
import { useNavigate } from 'react-router-dom';

export default function EditPage() {
  const navigate = useNavigate();
  const updateRoutine = useStore((s) => s.updateRoutine);
  const [open, setOpen] = useState(true);

  const routine = useRoutine();

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
