import { topicoDataFake } from "../../scripts/objetoTopicosFake";
import Topico from "./Topico";

const ListadoTopicos = () => {
    return (
        <div className='contenedor__topicos'>
            {
                topicoDataFake ?
                    topicoDataFake.map(topicoFake => (
                        <Topico key={topicoFake.id} topicoFake={topicoFake} />
                    ))
                    :
                    <h1 className="vacio">no hay topicos que mostrar 😓</h1>
            }
        </div>
    )
}

export default ListadoTopicos