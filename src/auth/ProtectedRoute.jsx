import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAdminSession } from './session';

export default function ProtectedRoute() {
  const location = useLocation();
  if (!isAdminSession()) {
    const next = encodeURIComponent(`${location.pathname}${location.search || ''}`);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return <Outlet />;
}
