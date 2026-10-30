import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import Header from './components/layout/Header';
import AppRoutes from './routes/routes'; 

function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        
        <Header /> 
        
        
        <AppRoutes />
        
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;