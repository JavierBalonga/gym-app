import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { ExerciseProvider } from './components/business/exercise-context';
import { ExerciseExecutionProvider } from './components/business/exercise-execution-context';
import Layout from './components/business/layout.tsx';
import { PreviousExerciseExecutionProvider } from './components/business/previous-exercise-execution-context';
import { RoutineProvider } from './components/business/routine-context';
import { RoutineExecutionProvider } from './components/business/routine-execution-context';
import ExecutePage from './pages/execute';
import ExecuteExercisePage from './pages/execute/exercise';
import AddSeriePage from './pages/execute/exercise/add-serie';
import HomePage from './pages/home/index.tsx';
import LoadingPage from './pages/loading';
import NotFoundPage from './pages/not-found.tsx';

const CreatePage = lazy(() => import('./pages/home/create'));
const EditPage = lazy(() => import('./pages/home/edit'));
const DeletePage = lazy(() => import('./pages/home/delete'));
const HistoryPage = lazy(() => import('./pages/history'));

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        children: [
          {
            path: '/create',
            element: (
              <Suspense fallback={<LoadingPage />}>
                <CreatePage />
              </Suspense>
            ),
          },
          {
            path: '/edit/:routineId',
            element: (
              <RoutineProvider>
                <Suspense fallback={<LoadingPage />}>
                  <EditPage />
                </Suspense>
              </RoutineProvider>
            ),
          },
          {
            path: '/delete/:routineId',
            element: (
              <RoutineProvider>
                <Suspense fallback={<LoadingPage />}>
                  <DeletePage />
                </Suspense>
              </RoutineProvider>
            ),
          },
        ],
      },
      {
        path: '/history/:routineId',
        element: (
          <RoutineProvider>
            <Suspense fallback={<LoadingPage />}>
              <HistoryPage />
            </Suspense>
          </RoutineProvider>
        ),
      },
      {
        path: '/execute/:routineId',
        element: (
          <RoutineProvider>
            <RoutineExecutionProvider>
              <ExecutePage />
            </RoutineExecutionProvider>
          </RoutineProvider>
        ),
        children: [
          {
            path: '/execute/:routineId/:exerciseId',
            element: (
              <ExerciseProvider>
                <ExerciseExecutionProvider>
                  <PreviousExerciseExecutionProvider>
                    <ExecuteExercisePage />
                  </PreviousExerciseExecutionProvider>
                </ExerciseExecutionProvider>
              </ExerciseProvider>
            ),
            children: [
              {
                path: '/execute/:routineId/:exerciseId/add-serie',
                element: <AddSeriePage />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, { basename: '/gym-app/' });

export default router;
