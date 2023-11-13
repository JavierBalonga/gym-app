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

export default function RoutineForm() {
  const form = useForm<RoutineFormValues>({
    resolver: zodResolver(routineformSchema),
    defaultValues: {
      name: '',
      exercises: [],
    },
  });

  function onSubmit(values: RoutineFormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Mi Rutina..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ExercisesField />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
