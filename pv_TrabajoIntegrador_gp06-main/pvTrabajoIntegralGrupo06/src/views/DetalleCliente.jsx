import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import {
  Container,
  Paper,
  Typography,
  Box,
  Stack,
  Divider,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [mensaje, setMensaje] = useState('');
  const [abrirMensaje, setAbrirMensaje] = useState(false);

  const rolUsuario = admin?.sector;

  const esSoporte = rolUsuario === "Soporte";
  const esGerencia = rolUsuario === "Gerencia";

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la información del cliente");
        }

        const datos = await respuesta.json();
        setCliente(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerCliente();
  }, [id]);

const eliminarCliente = async () => {
  if (window.confirm("¿Estás seguro de que querés eliminar este cliente?")) {
    try {
      const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al intentar eliminar el cliente");
      }

      const nombreEliminado =
        cliente?.name?.lastname || cliente?.username || `ID ${id}`;

      navigate("/clientes", {
        state: {
          eliminado: {
            id: Number(id),
            nombre: nombreEliminado,
          },
        },
      });
    } catch (err) {
      setMensaje("Error en la conexión al eliminar el cliente.");
      setAbrirMensaje(true);
    }
  }
};

if (cargando) {
  return (
    <Container maxWidth="md" sx={{ mt: 6, textAlign: 'center' }}>
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>Cargando datos del cliente...</Typography>
    </Container>
  );
}

if (error) {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Alert severity="error">Error: {error}</Alert>
    </Container>
  );
}

if (!cliente) {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Alert severity="warning">No se encontró el cliente.</Alert>
    </Container>
  );
}

  const { email, username, password, name, phone, address } = cliente;

return (
  <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
    <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Ficha Profunda del Cliente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID del cliente: {id}
          </Typography>
        </Box>

        <Chip
          label={rolUsuario || "Sin sector"}
          color={esGerencia ? "secondary" : "primary"}
          variant="filled"
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Información Personal
          </Typography>

          <Typography>
            <strong>Nombre completo:</strong> {name?.firstname} {name?.lastname}
          </Typography>

          <Typography>
            <strong>Teléfono:</strong> {phone}
          </Typography>

          <Typography>
            <strong>Email:</strong> {email}
          </Typography>
        </Paper>

        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Dirección
          </Typography>

          <Typography>
            <strong>Calle y número:</strong> {address?.street} n°{" "}
            {address?.number}
          </Typography>

          <Typography>
            <strong>Ciudad:</strong> {address?.city}
          </Typography>

          <Typography>
            <strong>Código postal:</strong> {address?.zipcode}
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Credenciales de Acceso
          </Typography>

          <Typography>
            <strong>Usuario:</strong> {username}
          </Typography>

          <Typography>
            <strong>Contraseña:</strong> {password}
          </Typography>
        </Paper>

        {esSoporte && (
          <Alert severity="info">
            Modo solo lectura: el sector Soporte puede visualizar la ficha, pero
            no tiene permisos para eliminar clientes.
          </Alert>
        )}

        {esGerencia && (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" color="error" onClick={eliminarCliente}>
              Eliminar Cliente de la Base de Datos
            </Button>
          </Box>
        )}
      </Stack>
    </Paper>

    <Snackbar
      open={abrirMensaje}
      autoHideDuration={3000}
      onClose={() => setAbrirMensaje(false)}
      message={mensaje}
    />
  </Container>
);
};

export default DetalleCliente;
