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
import formatTimeCountdown from '@/lib/formatTimeCountdown';
import { useNavigate } from 'react-router-dom';

const TIME_BETWEEN_ALERTS = 30000;

export default function RestPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    if (open) return;
    setOpen(false);
    setTimeout(() => navigate('..', { replace: true }), 200);
  };

  const exercise = useExercise();
  const startTime = useRef(Date.now().valueOf());
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!exercise) return;
    let animation: number;

    const rest = exercise.rest || 0;
    let nextAlertTime = 0;
    let numberOfAlerts = 0;
    function animate() {
      animation = requestAnimationFrame(animate);
      const span = spanRef.current;
      if (!span) return;
      const deltaTime = Date.now().valueOf() - startTime.current;
      const timeLeft = rest - deltaTime;
      const isNegative = timeLeft < 0;
      span.innerHTML = formatTimeCountdown(timeLeft);
      if (isNegative) {
        span.classList.add('text-destructive');
      } else {
        span.classList.remove('text-destructive');
      }

      if (timeLeft <= nextAlertTime) {
        navigator.vibrate(
          numberOfAlerts === 0
            ? [1000]
            : numberOfAlerts === 1
            ? [1000, 500, 1000]
            : [1000, 500, 1000, 500, 1000],
        );
        nextAlertTime -= TIME_BETWEEN_ALERTS;
        numberOfAlerts++;
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
            <div className="flex items-center justify-center py-10">
              <span className="font-mono text-5xl" ref={spanRef}>
                {exercise?.rest}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Parar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
