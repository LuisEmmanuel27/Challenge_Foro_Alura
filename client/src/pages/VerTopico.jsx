import { useLocation } from "react-router-dom"
import Header from "../components/foro/Header";
import Respuestas from "../components/verTopico/Respuestas";
import QuillComp from "../components/QuillComp";

const VerTopico = () => {

    const { state } = useLocation();
    const topicoFake = state?.topicoFake;

    return (
        <div className="topico__main">
            <Header />

            <div className="contenido__topico">
                <div className="header__topico">
                    <div className="titulo_fecha">
                        <h1>
                            {topicoFake.titulo}
                        </h1>
                        <span>Creado el: {topicoFake.fecha}</span>
                    </div>

                    <div className="tags_cruso">
                        <span>{topicoFake.tags}</span>
                        <span>{topicoFake.curso}</span>
                    </div>
                </div>

                <div className="autor__mensaje">
                    <figure className="autor">
                        <img src={topicoFake.foto} alt="foto_usuario" />
                        <figcaption>{topicoFake.autor}</figcaption>
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
                <span>Total: {topicoFake.respuestas.length}</span>
                {topicoFake.respuestas.length === 0 && <h2>No hay respuestas por ahora 😓</h2>}
            </div>

            <div className="contenedor__respuestas">
                {
                    topicoFake.respuestas &&
                    topicoFake.respuestas.map((respuesta, index) => (
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