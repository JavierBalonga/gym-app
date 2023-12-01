import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import minmax from '../../lib/minmax';

export interface NumberFormFieldProps {
  name: string;
  label: string;
  step?: number;
  min?: number;
  max?: number;
}

export default function NumberFormField({
  name,
  label,
  step = 1,
  min = -Infinity,
  max = Infinity,
}: NumberFormFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => {
        const handleChange = (newValue: number) => {
          onChange(minmax(min, newValue, max));
        };

        return (
          <FormItem>
            <div className="flex flex-row items-center gap-2">
              <FormLabel>{label}</FormLabel>
              <div className="grow" />
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleChange((Number(field.value) ?? 0) - step)}
                tabIndex={-1}
              >
                <Minus />
              </Button>
              <FormControl>
                <Input
                  className="w-[5em] text-center"
                  type="number"
                  {...field}
                  onChange={(e) => handleChange(Number(e.target.value) || 0)}
                />
              </FormControl>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleChange((Number(field.value) ?? 0) + step)}
                tabIndex={-1}
              >
                <Plus />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
