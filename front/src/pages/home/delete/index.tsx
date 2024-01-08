import { useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

export default function DeletePage() {
  const { routineId } = useParams<{ routineId: string }>();
  const navigate = useNavigate();
  const removeRoutine = useStore((s) => s.removeRoutine);
  const [open, setOpen] = useState(true);

  const routine = useRoutine();

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  const handleDelete = () => {
    if (!routineId) return;
    removeRoutine(routineId);
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar?</DialogTitle>
          <DialogDescription>
            La rutina "{routine?.name}" será eliminada permanentemente.
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
