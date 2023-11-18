import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import ExercisesField from './exercises-field';
import { routineformSchema, RoutineFormValues } from './routineform-schema';

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
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((routine) => onSubmit?.(routine))}
        className="flex grow flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Mi Rutina..." {...field} autoComplete="routine-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ExercisesField />
        <div className="grow" />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
}
