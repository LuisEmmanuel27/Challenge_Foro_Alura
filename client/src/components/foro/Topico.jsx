const Topico = ({ topicoFake }) => {

    console.log(topicoFake);

    return (
        <div className="topico__tarjeta">
            <h1>
                {topicoFake.titulo}
            </h1>

            <div className="contendio">
                {topicoFake.mensaje}
            </div>
        </div>
    )
}

export default Topico