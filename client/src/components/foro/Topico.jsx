import { useNavigate } from "react-router-dom";
import { formatearFecha } from "../../helper/formatoFecha";
import { listadoRespuestas } from "../../helper/api";
import { useEffect, useState } from "react";

const Topico = ({ topico, jwtToken }) => {

    const NAVIGATE = useNavigate();
    const handleMostrarTopico = () => {
        NAVIGATE(`/foro/topico/${topico.DatosUsuario.login}`, { state: { topico, respuestasData } });
    }
    const [respuestasData, setRespuestasData] = useState(null);

    useEffect(() => {
        const loadRespuestas = async () => {
            try {
                const { data } = await listadoRespuestas(jwtToken, topico.id);
                console.log(data);
                setRespuestasData(data);
            } catch (error) {
                console.log(error);
            }
        }

        loadRespuestas();
    }, [])

    return (
        <div className="topico__tarjeta">
            <div className="contenido__izq">
                <div
                    className="titulo"
                    style={{ cursor: "pointer" }}
                    onClick={handleMostrarTopico}
                >
                    <h1>{topico.titulo}</h1>
                </div>

                <div className="tags_cursos">
                    <span className="tag">{topico.tags}</span>
                    <span className="curso">{topico.curso}</span>
                </div>
            </div>

            <div className="contenido__der">
                <div className="respuestas">
                    {respuestasData ? `Respuestas: ${respuestasData?.length}` : 'Respuestas: --'}
                </div>

                <div className="detalles_usuario">
                    <figure>
                        <img src={topico.DatosUsuario.foto} alt="foto_perfil" />
                        <figcaption>
                            <span> Por: {topico.DatosUsuario.login}</span>
                            <span>{formatearFecha(topico.fecha)}</span>
                            <span>Estatus: {topico.estatus ? "resuelto" : "sin resolver"}</span>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default Topico