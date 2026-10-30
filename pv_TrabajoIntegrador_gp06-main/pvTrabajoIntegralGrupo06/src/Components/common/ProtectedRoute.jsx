import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';

const ProtectedRoute = () => {
  const { admin } = useContext(AdminContext);
 
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;