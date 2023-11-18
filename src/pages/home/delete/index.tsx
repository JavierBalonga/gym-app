import { useMemo, useState } from 'react';
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

export default function DeletePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const routines = useStore((s) => s.routines);
  const removeRoutine = useStore((s) => s.removeRoutine);
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

  const handleDelete = () => {
    if (!id) return;
    removeRoutine(id);
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
          <Button variant="outline" asChild>
            <Link to="..">Cancelar</Link>
          </Button>
          <Button onClick={handleDelete}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
