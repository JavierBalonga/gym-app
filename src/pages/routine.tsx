import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Section from '../components/section';
import { Button } from '../components/ui/button';

export default function CreateRoutinePage() {
  const navigate = useNavigate();
  return (
    <Section>
      <div className="flex flex-row items-center gap-4">
        <Button size="icon" variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft />
        </Button>
        <h1 className="text-3xl font-bold">Create Routine</h1>
      </div>
    </Section>
  );
}
