import axios from "axios";
import { BASE_URL_BDD } from "../constants/constantes";

const FORO_API = axios.create({
    baseURL: BASE_URL_BDD,
});

export const crearUsuario = (usuario) => {
    console.log('Datos del usuario a enviar:', usuario); // Agrega esta línea

    return FORO_API.post("/usuarios", usuario, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

