import TextFormField from '@/components/form-fields/text-form-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import ExercisesField from './exercises-field';
import { routineformSchema, RoutineFormValues } from './schemas';

export interface RoutineFormProps {
  defaultValues?: RoutineFormValues;
  onSubmit?: (values: RoutineFormValues) => void;
}

export default function RoutineForm({ defaultValues, onSubmit }: RoutineFormProps) {
  const form = useForm<RoutineFormValues>({
    resolver: zodResolver(routineformSchema),
    defaultValues: defaultValues || {
      id: crypto.randomUUID(),
      name: '',
      exercises: [],
      executions: [],
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex grow flex-col gap-4"
        onSubmit={form.handleSubmit((routine) => onSubmit?.(routine))}
      >
        <TextFormField name="name" label="Nombre" placeholder="Mi Rutina..." />
        <ExercisesField />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
}
