import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import NumberFormField from '../../form-fields/number-form-field';
import TextFormField from '../../form-fields/text-form-field';
import TextareaFormField from '../../form-fields/textarea-form-field';
import { Button } from '../../ui/button';
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
      sets: 0,
      reps: 0,
      weight: 0,
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
        <NumberFormField name="sets" label="Series" />
        <NumberFormField name="reps" label="Repeticiones" />
        <NumberFormField name="weight" label="Peso" />
        <TextareaFormField name="comment" label="Comentario" />
        <div className="grow" />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  );
}
