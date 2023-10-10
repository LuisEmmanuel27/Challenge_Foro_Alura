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

export const iniciarSesion = (usuario) => {
    console.log('Datos del usuario a enviar:', usuario);

    return FORO_API.post("/login", usuario, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const listaTopicos = (token) => {
    console.log('Token: ', token);

    return FORO_API.get('/topicos', {
        headers: {
            Authorization: token,
        },
    });
};

export const listadoRespuestas = (token, id) => {
    console.log('Token: ', token, 'id Topico: ', id);

    return FORO_API.get(`/respuestas/${id}`, {
        headers: {
            Authorization: token,
        }
    })
}