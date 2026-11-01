
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AdminContext } from "../context/AdminContext";
import { ClientesContext } from "../context/ClientesContext";

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
    CircularProgress
} from "@mui/material";

const DetalleCliente = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { admin } = useContext(AdminContext);

    const {
        todosLosClientes,
        loading,
        error,
        desactivarCliente
    } = useContext(ClientesContext);

    const cliente = todosLosClientes.find(
        (item) => String(item.id) === String(id)
    );

    const rolUsuario = admin?.sector;

    const esSoporte = rolUsuario === "Soporte";
    const esGerencia = rolUsuario === "Gerencia";

    const eliminarCliente = () => {

        const confirmar = window.confirm(
            "¿Estás seguro de que querés desactivar este cliente?"
        );

        if (!confirmar) {
            return;
        }

        desactivarCliente(cliente.id);

        navigate("/clientes", { replace: true });
    };

    if (loading && !cliente) {
        return (
            <Container
                maxWidth="md"
                sx={{ mt: 6, textAlign: "center" }}
            >
                <CircularProgress />

                <Typography sx={{ mt: 2 }}>
                    Cargando datos del cliente...
                </Typography>
            </Container>
        );
    }

    if (!cliente) {
        return (
            <Container maxWidth="md" sx={{ mt: 6 }}>
                <Alert severity={error ? "error" : "warning"}>
                    {error || "No se encontró el cliente."}
                </Alert>
            </Container>
        );
    }

    const {
        email,
        username,
        password,
        name,
        phone,
        address
    } = cliente;

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>

            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2
                    }}
                >

                    <Box>

                        <Typography
                            variant="h4"
                            component="h1"
                            fontWeight="bold"
                        >
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
                            <strong>Nombre completo:</strong>{" "}
                            {name?.firstname} {name?.lastname}
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
                            <strong>Calle y número:</strong>{" "}
                            {address?.street} n° {address?.number}
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
                            backgroundColor: "#f5f5f5"
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
                            Modo solo lectura: el sector Soporte puede visualizar
                            la ficha, pero no tiene permisos para desactivar clientes.
                        </Alert>
                    )}

                    {esGerencia && (
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>

                            <Button
                                variant="contained"
                                color="error"
                                onClick={eliminarCliente}
                            >
                                Desactivar Cliente
                            </Button>

                        </Box>
                    )}

                </Stack>

            </Paper>

        </Container>
    );
};

export default DetalleCliente;
