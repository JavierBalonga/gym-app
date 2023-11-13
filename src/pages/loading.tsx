import Section from '@/components/business/section';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingPage() {
  return (
    <Section>
      <Skeleton className="h-full w-full grow" />
    </Section>
  );
}
