import { Button } from '@/components/ui/button';
import { Link, Outlet } from 'react-router-dom';

import { UserMenu } from './user-menu';

export default function Layout() {
  return (
    <>
      <header className="flex flex-row justify-center">
        <div className="flex max-w-4xl grow flex-row items-center justify-between p-4">
          <Link to="/">
            <Button variant="link" className="text-2xl font-bold">
              Gym-App
            </Button>
          </Link>

          <UserMenu />
        </div>
      </header>
      <main className="flex grow flex-col items-center">
        <Outlet />
      </main>
    </>
  );
}
