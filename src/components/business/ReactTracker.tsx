import { useEffect, useMemo } from 'react';
import { routes } from '@/router';
import ReactGA from 'react-ga';
import { matchRoutes, useLocation } from 'react-router-dom';

const { VITE_GOOGLE_ANALYTICS_TRACKING_CODE } = import.meta.env;

if (
  VITE_GOOGLE_ANALYTICS_TRACKING_CODE &&
  typeof VITE_GOOGLE_ANALYTICS_TRACKING_CODE === 'string'
) {
  ReactGA.initialize(VITE_GOOGLE_ANALYTICS_TRACKING_CODE);
}

export default function ReactTracker() {
  const location = useLocation();

  const path = useMemo(() => {
    const res = matchRoutes(routes, location);
    return res?.at(-1)?.route.path;
  }, [location]);

  useEffect(() => {
    if (!path) return;
    ReactGA.pageview(path);
  }, [path]);

  return <></>;
}
