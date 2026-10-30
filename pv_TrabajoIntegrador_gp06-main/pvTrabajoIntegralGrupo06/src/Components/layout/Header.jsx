import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

const Header = () => {
  const { admin, logoutAdmin } = useContext(AdminContext);
  const navigate = useNavigate();


  if (!admin) return null;

  const handleLogout = () => {
    logoutAdmin();
    navigate('/login'); 
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ mr: 4 }}>
          Panel de Control
        </Typography>

        
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          <Button 
            component={Link} 
            to="/dashboard" 
            color="inherit" 
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button 
            component={Link} 
            to="/clientes" 
            color="inherit" 
            startIcon={<PeopleIcon />}
          >
            Clientes
          </Button>
        </Box>
        
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1">
            Bienvenido, <strong>{admin.nombre}</strong>
          </Typography>
          
          <Chip 
            label={admin.sector} 
            color={admin.sector === 'Gerencia' ? 'secondary' : 'default'} 
            variant="filled" 
          />

          <Button 
            variant="contained" 
            color="error" 
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;