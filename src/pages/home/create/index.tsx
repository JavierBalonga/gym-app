import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';

import RoutineForm from '../../../components/business/routine-form/routine-form';
import { useStore } from '../../../contexts/store';
import { Routine } from '../../../types';

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
      <SheetContent variant="preserve">
        <SheetHeader>
          <SheetTitle>Nueva Rutina</SheetTitle>
        </SheetHeader>
        <RoutineForm onSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
}
