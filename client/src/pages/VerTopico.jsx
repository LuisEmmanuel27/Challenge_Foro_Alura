import { useLocation } from "react-router-dom"
import Header from "../components/foro/Header";
import Respuestas from "../components/verTopico/Respuestas";
import QuillComp from "../components/QuillComp";
import { formatearFecha } from "../helper/formatoFecha";

const VerTopico = () => {

    const { state } = useLocation();
    const topicoFake = state?.topico;
    const respuestas = state?.respuestasData;

    console.log(respuestas);

    return (
        <div className="topico__main">
            <Header />

            <div className="contenido__topico">
                <div className="header__topico">
                    <div className="titulo_fecha">
                        <h1>
                            {topicoFake.titulo}
                        </h1>
                        <span>Creado el: {formatearFecha(topicoFake.fecha)}</span>
                    </div>

                    <div className="tags_cruso">
                        <span>{topicoFake.tags}</span>
                        <span>{topicoFake.curso}</span>
                    </div>
                </div>

                <div className="autor__mensaje">
                    <figure className="autor">
                        <img src={topicoFake.DatosUsuario.foto} alt="foto_usuario" />
                        <figcaption>{topicoFake.DatosUsuario.login}</figcaption>
                    </figure>

                    <div className="mensaje">
                        <p>
                            {topicoFake.mensaje}
                        </p>
                    </div>
                </div>

            </div>

            <div className="titulo_respuestas">
                <h1>Respuestas</h1>
                <span>Total: {respuestas.length}</span>
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

            <div className="form__respuesta__nueva">
                <h1>¿Quieres agregar una respuesta? ¡Adelante!</h1>

                <QuillComp />

                <div className="cont_btn">
                    <button className="btn_principal">enviar</button>
                </div>
            </div>
        </div>
    )
}

export default VerTopico