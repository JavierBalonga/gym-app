import { lazy, Suspense } from 'react';
import Layout from '@/components/business/layout';
import { Route, Routes } from 'react-router-dom';

import LoadingPage from './pages/loading';

const HomePage = lazy(() => import('./pages/home'));
const CreatePage = lazy(() => import('./pages/home/create'));
const EditPage = lazy(() => import('./pages/home/edit'));
const DeletePage = lazy(() => import('./pages/home/delete'));
const ExecutePage = lazy(() => import('./pages/execute'));
const NotFoundPage = lazy(() => import('./pages/not-found'));

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
        >
          <Route
            path="/create"
            element={
              <Suspense fallback={<LoadingPage />}>
                <CreatePage />
              </Suspense>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <EditPage />
              </Suspense>
            }
          />
          <Route
            path="/delete/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <DeletePage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/execute/:routineId/:exerciseId"
          element={
            <Suspense fallback={<LoadingPage />}>
              <ExecutePage />
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
