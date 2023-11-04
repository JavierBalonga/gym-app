import { ComponentProps } from 'react';

import { cn } from '../lib/utils';

export default function Section({ children, className, ...props }: ComponentProps<'section'>) {
  return (
    <section className={cn('w-full max-w-4xl grow px-4', className)} {...props}>
      {children}
    </section>
  );
}
