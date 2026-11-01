
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './context/AdminProvider';
import { ClientesProvider } from './context/ClientesProvider';
import Header from './Components/layout/Header';
import AppRoutes from './routes/routes';

function App() {
    return (
        <AdminProvider>
            <ClientesProvider>
                <BrowserRouter>
                    <Header />
                    <AppRoutes />
                </BrowserRouter>
            </ClientesProvider>
        </AdminProvider>
    );
}

export default App;
