import { ReactElement } from 'react';
import {
  FieldArrayPath,
  FieldValues,
  useFieldArray,
  UseFieldArrayProps,
  UseFieldArrayReturn,
} from 'react-hook-form';

export interface ArrayFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
> extends UseFieldArrayProps<TFieldValues, TFieldArrayName, TKeyName> {
  render: (
    renderProps: UseFieldArrayReturn<TFieldValues, TFieldArrayName, TKeyName>,
  ) => ReactElement;
}

export default function ArrayFormField<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
  TKeyName extends string = 'id',
>({ render, ...props }: ArrayFormFieldProps<TFieldValues, TFieldArrayName, TKeyName>) {
  const renderProps = useFieldArray<TFieldValues, TFieldArrayName, TKeyName>(props);
  return <>{render(renderProps)}</>;
}
