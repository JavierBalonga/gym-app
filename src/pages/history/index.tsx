import { useRoutine } from '@/components/business/routine-context';
import Section from '@/components/business/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import formatDatetime from '@/lib/formatDatetime';
import round from '@/lib/round';

export default function HistoryPage() {
  const routine = useRoutine();

  return (
    <Section className="gap-3">
      <h2 className="text-4xl font-bold">{routine?.name}</h2>
      <hr />
      <div className="flex grow flex-col-reverse justify-end gap-4">
        {routine?.executions.map((execution) => (
          <Card key={execution.id} className="flex flex-row items-center gap-4 p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <h5 className="text-xl font-bold">{formatDatetime(execution.date)}</h5>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-1">
                  <ul className="flex list-decimal flex-col gap-1 pl-6">
                    {execution.exercises.map((exerciseExecution) => {
                      const { sets, exerciseId } = exerciseExecution;
                      const exercise = routine.exercises.find((e) => e.id === exerciseId);
                      let totalWeight = 0;
                      let totalReps = 0;
                      sets.forEach((set) => {
                        totalWeight += set.weight;
                        totalReps += set.reps;
                      });
                      const avgWeight = sets.length ? round(totalWeight / sets.length, 0.5) : null;
                      const avgReps = sets.length ? round(totalReps / sets.length) : null;
                      return (
                        <li
                          key={exerciseExecution.id}
                          className="flex flex-row items-baseline justify-between gap-1"
                        >
                          <h5 className="text-lg">{exercise?.name}</h5>
                          <p className="text-foreground/50">
                            {sets.length
                              ? `${sets.length}x${avgReps} ${avgWeight && `${avgWeight}Kg`}`
                              : 'No hay ningún set'}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </Section>
  );
}

{
  /* <Card key={execution.id}>{formatDatetime(execution.date)}</Card> */
}
