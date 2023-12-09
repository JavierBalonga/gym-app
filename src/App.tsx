import { lazy, Suspense } from 'react';
import Layout from '@/components/business/layout';
import { Route, Routes } from 'react-router-dom';

import { ExerciseProvider } from './components/business/exercise-context';
import { ExerciseExecutionProvider } from './components/business/exercise-execution-context';
import { PreviousExerciseExecutionProvider } from './components/business/previous-exercise-execution-context';
import { RoutineProvider } from './components/business/routine-context';
import { RoutineExecutionProvider } from './components/business/routine-execution-context';
import ExecutePage from './pages/execute';
import ExecuteExercisePage from './pages/execute/exercise';
import AddSeriePage from './pages/execute/exercise/add-serie';
import HomePage from './pages/home';
import LoadingPage from './pages/loading';
import NotFoundPage from './pages/not-found';

const CreatePage = lazy(() => import('./pages/home/create'));
const EditPage = lazy(() => import('./pages/home/edit'));
const DeletePage = lazy(() => import('./pages/home/delete'));
const HistoryPage = lazy(() => import('./pages/history'));

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
            path="/edit/:routineId"
            element={
              <RoutineProvider>
                <Suspense fallback={<LoadingPage />}>
                  <EditPage />
                </Suspense>
              </RoutineProvider>
            }
          />
          <Route
            path="/delete/:routineId"
            element={
              <RoutineProvider>
                <Suspense fallback={<LoadingPage />}>
                  <DeletePage />
                </Suspense>
              </RoutineProvider>
            }
          />
        </Route>
        <Route
          path="/history/:routineId"
          element={
            <RoutineProvider>
              <Suspense fallback={<LoadingPage />}>
                <HistoryPage />
              </Suspense>
            </RoutineProvider>
          }
        />
        <Route
          path="/execute/:routineId"
          element={
            <RoutineProvider>
              <RoutineExecutionProvider>
                <ExecutePage />
              </RoutineExecutionProvider>
            </RoutineProvider>
          }
        >
          <Route
            path="/execute/:routineId/:exerciseId"
            element={
              <ExerciseProvider>
                <ExerciseExecutionProvider>
                  <PreviousExerciseExecutionProvider>
                    <ExecuteExercisePage />
                  </PreviousExerciseExecutionProvider>
                </ExerciseExecutionProvider>
              </ExerciseProvider>
            }
          >
            <Route path="/execute/:routineId/:exerciseId/add-serie" element={<AddSeriePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
