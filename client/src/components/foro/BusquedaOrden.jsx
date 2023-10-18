import { Link } from 'react-router-dom';
import SelectBusqueda from './SelectBusqueda';

const BusquedaOrden = () => {

    return (
        <div className='contenedor__orden__busqueda'>
            <form>
                <SelectBusqueda />
                <button className='btn_principal'>búscar</button>
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
