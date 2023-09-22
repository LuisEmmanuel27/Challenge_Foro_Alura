import AsideAnimado from "../components/foro/AsideAnimado"
import BusquedaOrden from "../components/foro/BusquedaOrden"
import Header from "../components/foro/Header"
import ListadoTopicos from "../components/foro/ListadoTopicos"

const Foro = () => {
    return (
        <div className="foro__main">
            <Header />

            <div className="contenedor__foro">
                <div className="lado__izquierdo">
                    <BusquedaOrden />
                    <ListadoTopicos />
                </div>

                <div className="lado__derecho">
                    <AsideAnimado />
                </div>
            </div>
        </div>
    )
}

export default Foro