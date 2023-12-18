import { useMemo, useState } from 'react';
import { useRoutine } from '@/components/business/routine-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useStore } from '@/contexts/store';
import { Link, useNavigate, useParams } from 'react-router-dom';

import formatDatetime from '../../../lib/formatDatetime';

export default function DeleteExecutionPage() {
  const { executionId } = useParams<{ executionId: string }>();
  const navigate = useNavigate();
  const removeRoutineExecution = useStore((s) => s.removeRoutineExecution);
  const [open, setOpen] = useState(true);

  const routine = useRoutine();
  const routineExecution = useMemo(() => {
    if (!routine) return null;
    const routineExecution = routine.executions.find((e) => e.id === executionId);
    if (!routineExecution) return null;
    return routineExecution;
  }, [routine]);

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  const handleDelete = () => {
    if (!routine || !routineExecution) return;
    removeRoutineExecution(routine.id, routineExecution.id);
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  if (!routine || !routineExecution) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar?</DialogTitle>
          <DialogDescription>
            La Ejecucion del "{formatDatetime(routineExecution.date)}" será eliminada
            permanentemente.
            <br />
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleDelete}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
