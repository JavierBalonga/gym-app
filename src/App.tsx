import { lazy, Suspense } from 'react';
import Layout from '@/components/business/layout';
import { Route, Routes } from 'react-router-dom';

import LoadingPage from './pages/loading';

const HomePage = lazy(() => import('./pages/home'));
const NotFoundPage = lazy(() => import('./pages/not-found'));
const CreateRoutinePage = lazy(() => import('./pages/routine'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<LoadingPage />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/routine"
          element={
            <Suspense fallback={<LoadingPage />}>
              <CreateRoutinePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingPage />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
