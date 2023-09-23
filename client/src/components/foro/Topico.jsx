import { Link } from "react-router-dom";

const Topico = ({ topicoFake }) => {
    return (
        <div className="topico__tarjeta">
            <div className="contenido__izq">
                <Link to="/"><h1>{topicoFake.titulo}</h1></Link>

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