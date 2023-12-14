import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import formatTime from '@/lib/formatTime';
import minmax from '@/lib/minmax';
import { Minus, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export interface TimeFormFieldProps {
  name: string;
  label: string;
  step?: number;
  min?: number;
  max?: number;
}

export default function TimeFormField({
  name,
  label,
  step = 15000,
  min = -Infinity,
  max = Infinity,
}: TimeFormFieldProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => {
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
                onClick={() => handleChange((Number(value) ?? 0) - step)}
                tabIndex={-1}
              >
                <Minus />
              </Button>
              <FormControl>
                <Input
                  className="w-[5em] text-center"
                  {...field}
                  value={formatTime(value)}
                  disabled
                />
              </FormControl>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => handleChange((Number(value) ?? 0) + step)}
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
