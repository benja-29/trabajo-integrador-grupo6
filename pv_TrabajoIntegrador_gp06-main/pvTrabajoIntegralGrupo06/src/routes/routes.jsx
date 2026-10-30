import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import ListaClientes from '../views/ListaClientes';
import DetalleCliente from '../views/DetalleCliente';

const AppRoutes = () => {
  return (
    <Routes>
    
      <Route path="/login" element={<Login />} />

    
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/clientes/:id" element={<DetalleCliente />} />
      </Route>

     
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;