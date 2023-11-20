import { useState } from 'react';
import RoutineForm from '@/components/business/routine-form/routine-form';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useStore } from '@/contexts/store';
import { Routine } from '@/types';
import { useNavigate } from 'react-router-dom';

export default function CreatePage() {
  const navigate = useNavigate();
  const addRoutine = useStore((s) => s.addRoutine);
  const [open, setOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  const handleSubmit = (routine: Routine) => {
    addRoutine(routine);
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nueva Rutina</SheetTitle>
        </SheetHeader>
        <RoutineForm onSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
}
