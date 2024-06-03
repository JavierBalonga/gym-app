import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import minmax from '@/lib/minmax';
import { Minus, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

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
      render={function NumberFormFieldRender({ field: { onChange, value, ...field } }) {
        const [inputValue, setInputValue] = useState(String(value));

        useEffect(() => {
          const inputValueNumber = Number(inputValue);
          if (inputValueNumber !== value) {
            setInputValue(String(value));
          }
        }, [value]);

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value.replace(/[^0-9.]/g, '');
          setInputValue(newValue);
          const newNumber = Number(newValue);
          if (Number.isNaN(newNumber)) return;
          onChange(minmax(min, newNumber, max));
        };

        const handlePlus = () => {
          const newValue = (Number(value) ?? 0) + step;
          onChange(minmax(min, newValue, max));
        };

        const handleMinus = () => {
          const newValue = (Number(value) ?? 0) - step;
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
                onClick={handleMinus}
                tabIndex={-1}
              >
                <Minus className="h-[1.2em] w-[1.2em]" />
              </Button>
              <FormControl>
                <Input
                  className="w-[5em] text-center"
                  {...field}
                  value={inputValue}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={handlePlus}
                tabIndex={-1}
              >
                <Plus className="h-[1.2em] w-[1.2em]" />
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
