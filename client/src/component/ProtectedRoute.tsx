import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

/**
 * ProtectedRoute component that handles route protection based on authentication state
 * @param requireAuth - If true, requires user to be authenticated. If false, redirects authenticated users away.
 */
export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { user } = useAuth();

  // If route requires authentication but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  // If route is for non-authenticated users (like auth page) but user is logged in
  if (!requireAuth && user) {
    return <Navigate to="/upload" replace />;
  }

  return <>{children}</>;
};