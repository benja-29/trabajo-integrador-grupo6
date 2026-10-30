import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Snackbar, 
  Alert, 
  Grid,
  CircularProgress
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const FormularioAltaCliente = ({ onClienteCreado }) => {
  const [cliente, setCliente] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    phone: ''
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); 

  const validarFormulario = () => {
    let tempErrores = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const soloNumerosRegex = /^[0-9+\s-]+$/;

    if (!cliente.firstname.trim()) {
      tempErrores.firstname = "El nombre es obligatorio.";
    } else if (!soloLetrasRegex.test(cliente.firstname)) {
      tempErrores.firstname = "El formato ingresado no es válido. Solo se permiten letras.";
    }

    if (!cliente.lastname.trim()) {
      tempErrores.lastname = "El apellido es obligatorio.";
    } else if (!soloLetrasRegex.test(cliente.lastname)) {
      tempErrores.lastname = "El formato ingresado no es válido. Solo se permiten letras.";
    }
    
    if (!cliente.email.trim()) {
      tempErrores.email = "El correo es obligatorio.";
    } else if (!emailRegex.test(cliente.email)) {
      tempErrores.email = "El formato ingresado no es válido.";
    }

    if (!cliente.username.trim()) {
      tempErrores.username = "El usuario es obligatorio.";
    }

    if (cliente.password.length < 4) {
      tempErrores.password = "La contraseña debe tener al menos 4 caracteres.";
    }

    if (!cliente.phone.trim()) {
      tempErrores.phone = "El teléfono es obligatorio.";
    } else if (!soloNumerosRegex.test(cliente.phone)) {
      tempErrores.phone = "El formato ingresado no es válido. Solo se permiten números.";
    }

    setErrores(tempErrores);
    return Object.keys(tempErrores).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setCargando(true);

    const datosEstructurados = {
      email: cliente.email,
      username: cliente.username,
      password: cliente.password,
      name: {
        firstname: cliente.firstname,
        lastname: cliente.lastname
      },
      address: {
        city: 'San Salvador de Jujuy',
        street: 'Av. Martiarena',
        number: 1050,
        zipcode: '4600',
        geolocation: { lat: '-24.185', long: '-65.300' }
      },
      phone: cliente.phone
    };

    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosEstructurados)
      });

      if (!response.ok) throw new Error('Error en la comunicación con el servidor.');

      const data = await response.json();
      
      setAlertSeverity('success');
      setAlertMessage(`¡Cliente registrado con éxito! ID asignado por API: ${data.id}`);
      setOpenSnackbar(true);

      setTimeout(() => {
        if (onClienteCreado) {
          onClienteCreado({ ...datosEstructurados, id: data.id });
        }
        setCliente({ firstname: '', lastname: '', email: '', username: '', password: '', phone: '' });
        setErrores({});
      }, 1500);

    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('Fallo en el servidor externo. No se pudo registrar.');
      setOpenSnackbar(true);
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            disabled={cargando}
            label="Nombre"
            name="firstname"
            value={cliente.firstname}
            onChange={handleChange}
            error={!!errores.firstname}
            helperText={errores.firstname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            disabled={cargando}
            label="Apellido"
            name="lastname"
            value={cliente.lastname}
            onChange={handleChange}
            error={!!errores.lastname}
            helperText={errores.lastname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            disabled={cargando}
            type="email"
            label="Correo Electrónico"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            error={!!errores.email}
            helperText={errores.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            disabled={cargando}
            label="Nombre de Usuario"
            name="username"
            value={cliente.username}
            onChange={handleChange}
            error={!!errores.username}
            helperText={errores.username}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            disabled={cargando}
            type="password"
            label="Contraseña"
            name="password"
            value={cliente.password}
            onChange={handleChange}
            error={!!errores.password}
            helperText={errores.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            disabled={cargando}
            label="Teléfono"
            name="phone"
            value={cliente.phone}
            onChange={handleChange}
            error={!!errores.phone}
            helperText={errores.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            size="large"
            disabled={cargando}
            startIcon={cargando ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
            sx={{ py: 1.5, fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }}
          >
            {cargando ? 'Procesando alta...' : 'Registrar Cliente en Base de Datos'}
          </Button>
        </Grid>
      </Grid>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={alertSeverity} variant="filled" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormularioAltaCliente;