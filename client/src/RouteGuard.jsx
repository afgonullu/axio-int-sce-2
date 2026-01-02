import { Navigate } from 'react-router-dom';

export function hasRole(user, role) {
  return user?.roles?.includes(role);
}

export default function RouteGuard({ user, requiredRole, children }) {
  if (!requiredRole && user.roles.length === 0) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
