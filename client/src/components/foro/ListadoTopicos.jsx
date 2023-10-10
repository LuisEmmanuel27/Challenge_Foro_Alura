import { useEffect, useState } from "react";
import Topico from "./Topico";
import { listaTopicos } from "../../helper/api";
import { GET_USER_DATA } from "../../constants/constantes";

const ListadoTopicos = () => {

    const { jwtToken } = GET_USER_DATA();
    const [topicosData, setTopicosData] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const loadTopicos = async () => {
            try {
                const { data } = await listaTopicos(jwtToken);
                setTopicosData(data.content);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false)
            }
        }

        loadTopicos();
    }, [])

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