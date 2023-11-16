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
import { Minus, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { ExcerciseFormValues, excerciseSchema } from './excercise-schema';

export interface ExcerciseFormProps {
  defaultValues?: ExcerciseFormValues;
  onSubmit?: (values: ExcerciseFormValues) => void;
}

export default function ExcerciseForm({ defaultValues, onSubmit }: ExcerciseFormProps) {
  const form = useForm<ExcerciseFormValues>({
    resolver: zodResolver(excerciseSchema),
    defaultValues: defaultValues || {
      id: crypto.randomUUID(),
      name: '',
      sets: 0,
      reps: 0,
      weight: 0,
      comment: '',
    },
  });

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4 py-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Mi Ejercicio..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sets"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormLabel>Series</FormLabel>
                <div className="grow" />
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => field.onChange(Math.max((Number(field.value) ?? 0) - 1, 0))}
                >
                  <Minus />
                </Button>
                <FormControl>
                  <Input className="w-10 text-center" type="number" {...field} />
                </FormControl>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => field.onChange((Number(field.value) ?? 0) + 1)}
                >
                  <Plus />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reps"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormLabel>Repeticiones</FormLabel>
                <div className="grow" />
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => field.onChange(Math.max((Number(field.value) ?? 0) - 1, 0))}
                >
                  <Minus />
                </Button>
                <FormControl>
                  <Input className="w-10 text-center" type="number" {...field} />
                </FormControl>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => field.onChange((Number(field.value) ?? 0) + 1)}
                >
                  <Plus />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row items-center gap-2">
                <FormLabel>Peso</FormLabel>
                <div className="grow" />
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => field.onChange(Math.max((Number(field.value) ?? 0) - 1, 0))}
                >
                  <Minus />
                </Button>
                <FormControl>
                  <Input className="w-10 text-center" type="number" {...field} />
                </FormControl>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => field.onChange((Number(field.value) ?? 0) + 1)}
                >
                  <Plus />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentario</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={() => onSubmit?.(form.getValues())}>
          Guardar
        </Button>
      </div>
    </Form>
  );
}
