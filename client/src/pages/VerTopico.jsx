import { useLocation } from "react-router-dom"
import Header from "../components/foro/Header";
import Respuestas from "../components/verTopico/Respuestas";
import { formatearFecha } from "../helper/formatoFecha";
import { GET_USER_DATA } from "../constants/constantes";
import Botones from "../components/verTopico/Botones";
import AgregarRespuesta from "../components/verTopico/AgregarRespuesta";
import { useEffect, useState } from "react";
import { listadoRespuestas } from "../helper/api";

const VerTopico = () => {

    const { state } = useLocation();
    const topico = state?.topico;
    const [respuestas, setRespuestas] = useState(state?.respuestasData)
    const [estadoRespuestaAdd, setEstadoRespuestaAdd] = useState(false);

    console.log(respuestas);

    useEffect(() => {
        const loadRespuestas = async () => {
            try {
                const { data } = await listadoRespuestas(GET_USER_DATA().jwtToken, topico.id);
                setRespuestas(data);
                setEstadoRespuestaAdd(false);
            } catch (error) {
                console.log(error);
            }
        }

        loadRespuestas();
    }, [estadoRespuestaAdd])

    return (
        <div className="topico__main">
            <Header />

            <div className="contenido__topico">
                <div className="header__topico">
                    <div className="titulo_fecha">
                        <h1>
                            {topico.titulo}
                        </h1>
                        <span>Creado el: {formatearFecha(topico.fecha)}</span>
                    </div>

                    <div className="tags_cruso">
                        <span>{topico.tags}</span>
                        <span>{topico.curso}</span>
                    </div>
                </div>

                <div className="autor__mensaje">
                    <figure className="autor">
                        <img src={topico.DatosUsuario.foto} alt="foto_usuario" />
                        <figcaption>{topico.DatosUsuario.login}</figcaption>
                    </figure>

                    <div className="mensaje" dangerouslySetInnerHTML={{ __html: topico.mensaje }} />
                </div>

                {
                    topico.DatosUsuario.login === GET_USER_DATA().login &&
                    <Botones idTopico={topico.id} />
                }

            </div>

            <div className="titulo_respuestas">
                <h1>Respuestas</h1>
                <span>Total: {respuestas?.length}</span>
                {respuestas.length === 0 && <h2>No hay respuestas por ahora 😓</h2>}
            </div>

            <div className="contenedor__respuestas">
                {
                    respuestas &&
                    respuestas.map((respuesta, index) => (
                        <Respuestas key={index} respuesta={respuesta} />
                    ))
                }
            </div>

            <AgregarRespuesta idTopico={topico.id} setEstadoRespuestaAdd={setEstadoRespuestaAdd} />
        </div>
    )
}

export default VerTopico