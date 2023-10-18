import { Link } from 'react-router-dom';
import SelectBusqueda from './SelectBusqueda';

const BusquedaOrden = ({ metodo, setMetodo, parametro, setParametro, setBusquedaRealizada }) => {

    const handleBuscar = (e) => {
        e.preventDefault();
        setBusquedaRealizada(true);
    }

    return (
        <div className='contenedor__orden__busqueda'>
            <form>
                <SelectBusqueda
                    metodo={metodo}
                    setMetodo={setMetodo}
                    parametro={parametro}
                    setParametro={setParametro}
                    setBusquedaRealizada={setBusquedaRealizada}
                />

                <button className='btn_principal' onClick={handleBuscar}>búscar</button>
            </form>

            <div className='crear'>
                <Link to="/foro/crear">
                    <button className='btn_principal'>crear nuevo topico</button>
                </Link>
            </div>
        </div>
    );
};

export default BusquedaOrden;
