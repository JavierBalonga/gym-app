import NumberFormField from '@/components/form-fields/number-form-field';
import TextFormField from '@/components/form-fields/text-form-field';
import TextareaFormField from '@/components/form-fields/textarea-form-field';
import TimeFormField from '@/components/form-fields/time-form-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ExcerciseFormValues, excerciseSchema } from './schemas';

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
      sets: 1,
      reps: 1,
      weight: 0,
      rest: 120000, // 2 minutes
      comment: '',
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit?.(values);
  });

  return (
    <Form {...form}>
      <form
        className="flex grow flex-col gap-4"
        onSubmit={(e) => {
          e.stopPropagation();
          handleSubmit(e);
        }}
      >
        <TextFormField name="name" label="Nombre" placeholder="Mi Ejercicio..." />
        <NumberFormField name="sets" label="Series" min={1} max={99} />
        <NumberFormField name="reps" label="Repeticiones" min={1} max={999} />
        <NumberFormField name="weight" label="Peso" min={0} step={0.5} max={999} />
        <TimeFormField name="rest" label="Descanso" min={0} step={15000} max={600000} />
        <TextareaFormField name="comment" label="Comentario" />
        <div className="grow" />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
}
