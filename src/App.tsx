import { lazy, Suspense } from 'react';
import Layout from '@/components/business/layout';
import { Route, Routes } from 'react-router-dom';

import ExecutePage from './pages/execute';
import ExecuteExercisePage from './pages/execute/exercise';
import AddSeriePage from './pages/execute/exercise/add-serie';
import HomePage from './pages/home';
import LoadingPage from './pages/loading';
import NotFoundPage from './pages/not-found';

const CreatePage = lazy(() => import('./pages/home/create'));
const EditPage = lazy(() => import('./pages/home/edit'));
const DeletePage = lazy(() => import('./pages/home/delete'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />}>
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
        <Route path="/execute/:routineId" element={<ExecutePage />}>
          <Route path="/execute/:routineId/:exerciseId" element={<ExecuteExercisePage />}>
            <Route path="/execute/:routineId/:exerciseId/add-serie" element={<AddSeriePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
