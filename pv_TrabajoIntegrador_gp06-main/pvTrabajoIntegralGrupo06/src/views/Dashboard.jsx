import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { Container, Typography, Grid, Card, CardContent, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Dashboard = () => {
  const { admin } = useContext(AdminContext);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      {/* Mensaje de Bienvenida usando el Estado Global del Módulo A */}
      <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Bienvenido al Sistema, {admin?.nombre}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Actualmente estás operando con los permisos asignados al sector de: <strong>{admin?.sector}</strong>.
        </Typography>
      </Box>

      {/* Tarjetas de Métricas Globales Simuladas (Estructura de Panel) */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ borderLeft: '5px solid #1976d2' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" variant="overline">
                    Total Clientes API
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
                    10
                  </Typography>
                </Box>
                <PeopleAltIcon sx={{ fontSize: 40, color: '#1976d2' }} />
              </Box>
              <Button 
                component={Link} 
                to="/clientes" 
                size="small" 
                endIcon={<ArrowForwardIcon />} 
                sx={{ mt: 2 }}
              >
                Gestionar Clientes
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={3} sx={{ borderLeft: '5px solid #9c27b0' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" variant="overline">
                    Conexión de Servidor
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1, color: 'success.main' }}>
                    ONLINE
                  </Typography>
                </Box>
                <BusinessIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
              </Box>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 3.5 }}>
                Sincronizado con FakeStoreAPI
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;