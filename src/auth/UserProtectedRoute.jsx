import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isUserSession } from './session';

export default function UserProtectedRoute() {
  const location = useLocation();
  if (!isUserSession()) {
    const next = encodeURIComponent(`${location.pathname}${location.search || ''}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return <Outlet />;
}
