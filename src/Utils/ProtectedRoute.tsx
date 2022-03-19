import { Navigate } from 'react-router-dom';

import { AuthType, useAuth } from '../Contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useAuth() as AuthType;
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
