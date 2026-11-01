
import { useEffect, useState } from "react";
import { ClientesContext } from "./ClientesContext";

const STORAGE_KEY = "clientes_sesion";

const leerDatosGuardados = () => {
    try {
        const datos = JSON.parse(sessionStorage.getItem(STORAGE_KEY));

        return {
            clientesNuevos: Array.isArray(datos?.clientesNuevos)
                ? datos.clientesNuevos
                : [],
            idsInactivos: Array.isArray(datos?.idsInactivos)
                ? datos.idsInactivos.map(String)
                : []
        };
    } catch {
        return {
            clientesNuevos: [],
            idsInactivos: []
        };
    }
};

export const ClientesProvider = ({ children }) => {

    const [clientesApi, setClientesApi] = useState([]);
    const [datosLocales, setDatosLocales] = useState(() => leerDatosGuardados());

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { clientesNuevos, idsInactivos } = datosLocales;

    useEffect(() => {
        sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(datosLocales)
        );
    }, [datosLocales]);

    useEffect(() => {
        let componenteActivo = true;

        const cargarClientes = async () => {
            try {
                setLoading(true);
                setError(null);

                const respuesta = await fetch(
                    "https://fakestoreapi.com/users"
                );

                if (!respuesta.ok) {
                    throw new Error("Error al cargar los clientes");
                }

                const datos = await respuesta.json();

                if (componenteActivo) {
                    setClientesApi(datos);
                }

            } catch {
                if (componenteActivo) {
                    setError(
                        "No se pudieron cargar los clientes desde la API."
                    );
                }
            } finally {
                if (componenteActivo) {
                    setLoading(false);
                }
            }
        };

        cargarClientes();

        return () => {
            componenteActivo = false;
        };
    }, []);

    const todosLosClientes = [
        ...clientesApi,
        ...clientesNuevos
    ];

    const clientes = todosLosClientes.filter(
        (cliente) => !idsInactivos.includes(String(cliente.id))
    );

    const clientesInactivos = todosLosClientes.filter(
        (cliente) => idsInactivos.includes(String(cliente.id))
    );

    const agregarCliente = (nuevoCliente) => {

        const clienteLocal = {
            ...nuevoCliente,
            id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            idApi: nuevoCliente.id ?? null,
            esLocal: true
        };

        setDatosLocales((previos) => ({
            ...previos,
            clientesNuevos: [
                ...previos.clientesNuevos,
                clienteLocal
            ]
        }));

        return clienteLocal;
    };

    const desactivarCliente = (id) => {

        const idTexto = String(id);

        setDatosLocales((previos) => ({
            ...previos,
            idsInactivos: previos.idsInactivos.includes(idTexto)
                ? previos.idsInactivos
                : [...previos.idsInactivos, idTexto]
        }));
    };

    return (
        <ClientesContext.Provider
            value={{
                clientes,
                todosLosClientes,
                clientesInactivos,
                loading,
                error,
                agregarCliente,
                desactivarCliente
            }}
        >
            {children}
        </ClientesContext.Provider>
    );
};
