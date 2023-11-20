import { Minus, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '../ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

export interface NumberFormFieldProps {
  name: string;
  label: string;
}

export default function NumberFormField({ name, label }: NumberFormFieldProps) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <div className="flex flex-row items-center gap-2">
            <FormLabel>{label}</FormLabel>
            <div className="grow" />
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() => onChange(Math.max((Number(field.value) ?? 0) - 1, 0))}
              tabIndex={-1}
            >
              <Minus />
            </Button>
            <FormControl>
              <Input
                className="w-10 text-center"
                type="number"
                {...field}
                onChange={(e) => onChange(Number(e.target.value) || 0)}
              />
            </FormControl>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() => onChange((Number(field.value) ?? 0) + 1)}
              tabIndex={-1}
            >
              <Plus />
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
