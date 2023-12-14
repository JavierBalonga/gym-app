import { useEffect, useRef, useState } from 'react';
import { useExercise } from '@/components/business/exercise-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Link, useNavigate } from 'react-router-dom';

export default function RestPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setOpen(false);
    setTimeout(() => navigate('..'), 200);
  };

  const exercise = useExercise();
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!exercise) return;
    let animation: number;

    const rest = exercise.rest || 0;
    const startTime = Date.now().valueOf();
    function animate() {
      animation = requestAnimationFrame(animate);
      const span = spanRef.current;
      if (!span) return;
      const deltaTime = Date.now().valueOf() - startTime;
      const timeLeft = rest - deltaTime;
      const isNegative = timeLeft < 0;
      const minutes = Math.floor((Math.abs(timeLeft) / (1000 * 60)) % 60);
      const seconds = Math.floor((Math.abs(timeLeft) / 1000) % 60);
      const milliseconds = Math.floor((Math.abs(timeLeft) / 10) % 100);
      const minutesStr = String(minutes);
      const secondsStr = String(seconds).padStart(2, '0');
      const millisecondsStr = String(milliseconds).padStart(2, '0');
      span.innerHTML = `${isNegative ? '-' : ''}${minutesStr}:${secondsStr}.${millisecondsStr}`;

      if (isNegative) {
        span.classList.add('text-destructive');
      } else {
        span.classList.remove('text-destructive');
      }
    }

    animation = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animation);
  }, [exercise?.rest]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tiempo de Descanso</DialogTitle>
          <DialogDescription asChild>
            <div className="flex items-center justify-center">
              <span className="font-mono text-4xl" ref={spanRef}>
                {exercise?.rest}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" asChild>
            <Link to="..">Parar</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
