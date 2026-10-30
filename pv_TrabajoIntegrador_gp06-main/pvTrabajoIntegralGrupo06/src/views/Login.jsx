import { useState, useContext, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, MenuItem, Typography, Box } from '@mui/material';

const Login = () => {
  const { admin, loginAdmin } = useContext(AdminContext);
  const [nombre, setNombre] = useState('');
  const [sector, setSector] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    if (admin) {
      navigate('/dashboard');
    }
  }, [admin, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() && sector) {
      loginAdmin({ nombre, sector });
      navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Ingreso al Sistema
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nombre del Administrador"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            <TextField
              select
              margin="normal"
              required
              fullWidth
              label="Sector de la Empresa"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
            >
              <MenuItem value="Soporte">Soporte</MenuItem>
              <MenuItem value="Gerencia">Gerencia</MenuItem>
            </TextField>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Ingresar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;