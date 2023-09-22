import { topicoDataFake } from "../../scripts/objetoTopicosFake";
import Topico from "./Topico";

const ListadoTopicos = () => {
    return (
        <div className='contenedor__topicos'>
            {
                topicoDataFake.map(topicoFake => (
                    <Topico key={topicoFake.id} topicoFake={topicoFake} />
                ))
            }
        </div>
    )
}

export default ListadoTopicos