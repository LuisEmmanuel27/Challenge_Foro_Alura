import { useEffect, useState } from "react"
import AsideAnimado from "../components/foro/AsideAnimado"
import BusquedaOrden from "../components/foro/BusquedaOrden"
import Header from "../components/foro/Header"
import ListadoTopicos from "../components/foro/ListadoTopicos"
import { GET_USER_DATA } from "../constants/constantes"
import { buscarTopico, listaTopicos } from "../helper/api"

const Foro = () => {

    const { jwtToken } = GET_USER_DATA();
    const [metodo, setMetodo] = useState('tags');
    const [parametro, setParametro] = useState('DUDA');
    const [topicosData, setTopicosData] = useState(null);
    const [loader, setLoader] = useState(true);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    useEffect(() => {
        const loadTopicos = async () => {
            setLoader(true);
            try {
                const { data } = await listaTopicos(jwtToken);
                setTopicosData(data.content);
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false)
            }
        }

        const loadTopicosBuscados = async () => {
            setLoader(true);
            let dataBusqueda = {};

            if (metodo === 'tags') dataBusqueda = { 'tags': parametro };
            else dataBusqueda = { 'curso': parametro };

            try {
                const { data } = await buscarTopico(jwtToken, dataBusqueda);
                setTopicosData(data.content);
            }
            catch (error) {
                console.log(error.message);
            }
            finally {
                setLoader(false);
            }
        }

        if (busquedaRealizada) {
            loadTopicosBuscados();
        } else {
            loadTopicos();
        }
    }, [busquedaRealizada])

    return (
        <div className="foro__main">
            <Header />

            <div className="contenedor__foro">
                <div className="lado__izquierdo">
                    <BusquedaOrden
                        metodo={metodo}
                        setMetodo={setMetodo}
                        parametro={parametro}
                        setParametro={setParametro}
                        setBusquedaRealizada={setBusquedaRealizada}
                    />

                    <ListadoTopicos jwtToken={jwtToken} topicosData={topicosData} loader={loader} />
                </div>

                <div className="lado__derecho">
                    <AsideAnimado />
                </div>
            </div>
        </div>
    )
}

export default Foro