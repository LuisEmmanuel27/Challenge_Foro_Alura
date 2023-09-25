const Respuestas = ({ respuesta }) => {
    return (
        <div className='respuesta'>
            <div className='autor__mensaje'>
                <figure className="autor">
                    <img src={respuesta.foto} alt="foto_user_res" width={"100px"} />

                    <figcaption>
                        <span>{respuesta.autor}</span>
                        <span>Respondió el: {respuesta.fecha}</span>
                    </figcaption>

                    {/* Modificar esta parte para que valide si el usuario que esta revisando las respuestas es el
            mismo que escribio el post, intuyo que seria haciendo uso de el localstorage */}
                    <div className="check">
                        <label htmlFor="solucion">¿Esta respuesta soluciono el problema?</label>
                        <input type="checkbox" />
                    </div>
                </figure>

                <div className='mensaje'>
                    <p>
                        {respuesta.mensaje}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Respuestas