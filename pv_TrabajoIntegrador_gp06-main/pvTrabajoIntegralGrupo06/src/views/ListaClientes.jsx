import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Container,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Button,
    Box,
    Modal
} from "@mui/material";
import FormularioAltaCliente from "../components/common/FormularioAltaCliente";

const ListaClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ultimaActualizacion, setUltimaActualizacion] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [clientesEliminados, setClientesEliminados] = useState(() => {
    const guardados = localStorage.getItem("clientes_eliminados");

   if (!guardados) return [];

   const datos = JSON.parse(guardados);

   return datos.map((item) =>
    typeof item === "number"
      ? { id: item, nombre: `ID ${item}` }
      : item
  );
});
const cargarClientes = async () => {
  try {
    setLoading(true);
    setError(null);

    const respuesta = await fetch("https://fakestoreapi.com/users");

    if (!respuesta.ok) {
      throw new Error("Error al obtener clientes");
    }

    const datos = await respuesta.json();

    if (location.state?.eliminado) {
      const eliminado = location.state.eliminado;

      setClientesEliminados((previos) => {
        const yaExiste = previos.some((item) => item.id === eliminado.id);

        if (yaExiste) {
          return previos;
        }

        const nuevaLista = [...previos, eliminado];

        localStorage.setItem(
          "clientes_eliminados",
          JSON.stringify(nuevaLista)
        );

        return nuevaLista;
      });

      navigate(location.pathname, { replace: true, state: null });
    }

    setClientes(datos);
    setClientesFiltrados(datos);
    setUltimaActualizacion(new Date().toLocaleString("es-AR"));
  } catch (error) {
    setError("No se pudieron cargar los clientes.");
  } finally {
    setLoading(false);
  }
};

    useEffect(() => {
        cargarClientes();
    }, []);

    useEffect(() => {
        const resultado = clientes.filter((cliente) =>
            cliente.name.lastname.toLowerCase().includes(busqueda.toLowerCase()) ||
            cliente.address.city.toLowerCase().includes(busqueda.toLowerCase())
        );
        setClientesFiltrados(resultado);
    }, [busqueda, clientes]);

    const handleClienteCreado = (nuevoCliente) => {
        const listaActualizada = [nuevoCliente, ...clientes];
        setClientes(listaActualizada);
        setModalOpen(false);
    };

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="70vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
      <Container sx={{ mt: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h4" gutterBottom>
              Lista de Clientes
            </Typography>
            <Typography variant="body2">
              Última actualización: {ultimaActualizacion}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={() => setModalOpen(true)}
          >
            Nuevo Cliente
          </Button>
        </Box>

        <TextField
          fullWidth
          label="Buscar por apellido o ciudad"
          variant="outlined"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Ciudad</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
<TableBody>
  {clientesFiltrados.map((cliente) => {
    const clienteEliminado = clientesEliminados.find(
      (item) => item.id === cliente.id
    );

    if (clienteEliminado) {
      return (
        <TableRow key={cliente.id}>
          <TableCell colSpan={6} sx={{ p: 0 }}>
            <Alert severity="info" sx={{ borderRadius: 0 }}>
              Usuario {clienteEliminado.nombre} marcado como eliminado.
            </Alert>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow key={cliente.id}>
        <TableCell>{cliente.id}</TableCell>
        <TableCell>
          {cliente.name.firstname} {cliente.name.lastname}
        </TableCell>
        <TableCell>{cliente.email}</TableCell>
        <TableCell>{cliente.phone}</TableCell>
        <TableCell>{cliente.address.city}</TableCell>
        <TableCell>
          <Button
            component={Link}
            to={`/clientes/${cliente.id}`}
            variant="contained"
          >
            Ver Detalle
          </Button>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-alta-cliente"
          aria-describedby="modal-formulario-alta"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 600 },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <Typography
              id="modal-alta-cliente"
              variant="h5"
              sx={{ mb: 2, fontWeight: "bold", color: "#1a237e" }}
            >
              Alta de Nuevo Cliente
            </Typography>
            <FormularioAltaCliente onClienteCreado={handleClienteCreado} />
          </Box>
        </Modal>
      </Container>
    );
};

export default ListaClientes;