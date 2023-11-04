import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="flex flex-row justify-center">
        <div className="grow max-w-4xl">Header</div>
      </header>
      <main className="grow flex flex-col items-center">
        <Outlet />
      </main>
      <footer className="flex flex-row justify-center">
        <div className="grow max-w-4xl">Footer</div>
      </footer>
    </>
  );
}
