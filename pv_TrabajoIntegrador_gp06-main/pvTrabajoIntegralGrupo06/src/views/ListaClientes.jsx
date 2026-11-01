
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

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

import FormularioAltaCliente from "../Components/common/FormularioAltaCliente";
import { ClientesContext } from "../context/ClientesContext";

const ListaClientes = () => {

    const {
        clientes,
        loading,
        error,
        agregarCliente
    } = useContext(ClientesContext);

    const [busqueda, setBusqueda] = useState("");
    const [ultimaActualizacion] = useState(
        () => new Date().toLocaleString("es-AR")
    );
    const [modalOpen, setModalOpen] = useState(false);

    const clientesFiltrados = clientes.filter((cliente) => {

        const apellido = cliente.name?.lastname ?? "";
        const ciudad = cliente.address?.city ?? "";

        return (
            apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
            ciudad.toLowerCase().includes(busqueda.toLowerCase())
        );
    });

    const handleClienteCreado = (nuevoCliente) => {

        agregarCliente(nuevoCliente);

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
                        Fecha de consulta: {ultimaActualizacion}
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

            {error && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

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

                        {clientesFiltrados.length === 0 ? (

                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No se encontraron clientes.
                                </TableCell>
                            </TableRow>

                        ) : (

                            clientesFiltrados.map((cliente) => (

                                <TableRow key={cliente.id}>

                                    <TableCell>
                                        {cliente.id}
                                    </TableCell>

                                    <TableCell>
                                        {cliente.name?.firstname} {cliente.name?.lastname}
                                    </TableCell>

                                    <TableCell>
                                        {cliente.email}
                                    </TableCell>

                                    <TableCell>
                                        {cliente.phone}
                                    </TableCell>

                                    <TableCell>
                                        {cliente.address?.city}
                                    </TableCell>

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

                            ))

                        )}

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
                        overflowY: "auto"
                    }}
                >

                    <Typography
                        id="modal-alta-cliente"
                        variant="h5"
                        sx={{
                            mb: 2,
                            fontWeight: "bold",
                            color: "#1a237e"
                        }}
                    >
                        Alta de Nuevo Cliente
                    </Typography>

                    <FormularioAltaCliente
                        onClienteCreado={handleClienteCreado}
                    />

                </Box>

            </Modal>

        </Container>
    );
};

export default ListaClientes;
