import { Link, Outlet } from "react-router-dom";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Layout() {
  return (
    <>
      <header className="flex flex-row justify-center">
        <div className="grow max-w-4xl flex flex-row justify-between py-4">
          <Link to="/">
            <Button variant="link" className="text-2xl font-bold">
              Gym-App
            </Button>
          </Link>

          <ModeToggle />
        </div>
      </header>
      <main className="grow flex flex-col items-center">
        <Outlet />
      </main>
    </>
  );
}
