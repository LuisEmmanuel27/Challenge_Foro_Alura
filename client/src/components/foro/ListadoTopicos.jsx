import Topico from "./Topico";

const ListadoTopicos = ({ jwtToken, topicosData, loader }) => {

    return (
        <div className='contenedor__topicos'>
            {
                topicosData ?
                    topicosData.map(topico => (
                        <Topico key={topico.id} topico={topico} jwtToken={jwtToken} />
                    ))
                    :
                    <h1 className="vacio">{loader ? "Cargando..." : "no hay topicos que mostrar 😓"}</h1>
            }
        </div>
    )
}

export default ListadoTopicos