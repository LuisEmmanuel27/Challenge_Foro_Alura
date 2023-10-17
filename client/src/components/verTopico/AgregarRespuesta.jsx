import { useState } from "react";
import ReactQuill from "react-quill";
import { GET_USER_DATA } from "../../constants/constantes";
import toast, { Toaster } from "react-hot-toast";
import { agregarRespuesta } from "../../helper/api";

const AgregarRespuesta = ({ idTopico, setEstadoRespuestaAdd }) => {

    const initialState = {
        mensaje: '',
        fecha: new Date().toISOString(),
        idUsuario: GET_USER_DATA().id,
        idTopico
    }

    const { jwtToken } = GET_USER_DATA();
    const [respuestaData, setRespuestaData] = useState(initialState)

    const validarMensaje = () => {
        const mensajeSinEtiquetas = respuestaData.mensaje.replace(/<[^>]+>/g, '');
        const mensajeLimpio = mensajeSinEtiquetas.trim();

        if (mensajeLimpio === '') {
            toast.error('Agrega un mensaje', {
                position: "top-center",
                style: {
                    backgroundColor: "#111",
                    color: "#fff",
                }
            })
            return false;
        }

        return true;
    }

    const handleSubmitRespuesta = async (e) => {
        e.preventDefault();

        if (validarMensaje()) {
            try {
                const response = await agregarRespuesta(jwtToken, respuestaData);
                console.log(response);
                setEstadoRespuestaAdd(true);
                setRespuestaData(initialState);
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div className="form__respuesta__nueva">
            <h1>¿Quieres agregar una respuesta? ¡Adelante!</h1>

            <ReactQuill theme="snow" value={respuestaData.mensaje} onChange={(content) => setRespuestaData({ ...respuestaData, mensaje: content })} />

            <div className="cont_btn">
                <button className="btn_principal" onClick={handleSubmitRespuesta}>enviar</button>
            </div>

            <Toaster />
        </div>
    )
}

export default AgregarRespuesta