import { useNavigate } from "react-router-dom";


const Topico = ({ topicoFake }) => {

    const NAVIGATE = useNavigate();

    const handleMostrarTopico = () => {
        NAVIGATE(`/foro/topico/${topicoFake.autor}`, { state: { topicoFake } });
    }

    return (
        <div className="topico__tarjeta">
            <div className="contenido__izq">
                <div
                    className="titulo"
                    style={{ cursor: "pointer" }}
                    onClick={handleMostrarTopico}
                >
                    <h1>{topicoFake.titulo}</h1>
                </div>

                <div className="tags_cursos">
                    <span className="tag">{topicoFake.tags}</span>
                    <span className="curso">{topicoFake.curso}</span>
                </div>
            </div>

            <div className="contenido__der">
                <div className="respuestas">
                    {`Respuestas: ${topicoFake.respuestas.length}`}
                </div>

                <div className="detalles_usuario">
                    <figure>
                        <img src={topicoFake.foto} alt="foto_perfil" />
                        <figcaption>
                            <span> Por: {topicoFake.autor}</span>
                            <span>{topicoFake.fecha}</span>
                            <span>Estatus: {topicoFake.estatus ? "resuelto" : "sin resolver"}</span>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default Topico