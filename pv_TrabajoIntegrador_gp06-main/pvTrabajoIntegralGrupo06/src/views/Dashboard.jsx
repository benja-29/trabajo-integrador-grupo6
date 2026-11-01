
import { useContext } from "react";

import { AdminContext } from "../context/AdminContext";
import { ClientesContext } from "../context/ClientesContext";

import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Alert
} from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessIcon from "@mui/icons-material/Business";
import PersonOffIcon from "@mui/icons-material/PersonOff";

const Dashboard = () => {

    const { admin } = useContext(AdminContext);

    const {
        clientes,
        todosLosClientes,
        clientesInactivos,
        loading,
        error
    } = useContext(ClientesContext);

    const metricas = [
        {
            titulo: "Clientes Activos",
            cantidad: clientes.length,
            icono: <PeopleAltIcon sx={{ fontSize: 40, color: "#1976d2" }} />
        },
        {
            titulo: "Clientes Inactivos",
            cantidad: clientesInactivos.length,
            icono: <PersonOffIcon sx={{ fontSize: 40, color: "#d32f2f" }} />
        },
        {
            titulo: "Total de Clientes Registrados",
            cantidad: todosLosClientes.length,
            icono: <BusinessIcon sx={{ fontSize: 40, color: "#9c27b0" }} />
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>

            <Box
                sx={{
                    mb: 4,
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 1
                }}
            >

                <Typography variant="h4" component="h1" gutterBottom>
                    ¡Bienvenido al Sistema, {admin?.nombre}!
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    Actualmente estás operando con los permisos asignados
                    al sector de: <strong>{admin?.sector}</strong>.
                </Typography>

            </Box>

            {error && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <Grid container spacing={3}>

                {metricas.map((metrica) => (

                    <Grid item xs={12} sm={6} md={4} key={metrica.titulo}>

                        <Card
                            elevation={3}
                            sx={{ borderLeft: "5px solid #1976d2" }}
                        >

                            <CardContent>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            color="text.secondary"
                                            variant="overline"
                                        >
                                            {metrica.titulo}
                                        </Typography>

                                        <Typography
                                            variant="h4"
                                            sx={{ fontWeight: "bold", my: 1 }}
                                        >
                                            {loading ? "..." : metrica.cantidad}
                                        </Typography>

                                    </Box>

                                    {metrica.icono}

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

            <Box sx={{ mt: 3 }}>

                <Typography variant="body2" color="text.secondary">
                    Estado del servidor:{" "}
                    {loading
                        ? "Conectando..."
                        : error
                            ? "Sin conexión"
                            : "ONLINE"}
                </Typography>

            </Box>

        </Container>
    );
};

export default Dashboard;
