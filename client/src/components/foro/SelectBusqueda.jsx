import { useEffect } from 'react';

const SelectBusqueda = ({ metodo, setMetodo, parametro, setParametro, setBusquedaRealizada }) => {
    const opcionesPorMetodo = {
        tags: ["DUDA", "PROGRAMACION", "OFFTOPIC"],
        curso: ["JAVA", "JAVASCRIPT", "PYTHON"],
    };

    // Función para manejar el cambio en el primer select
    const handleMetodoBusquedaChange = (e) => {
        const selectedMetodo = e.target.value;
        setMetodo(selectedMetodo);
        setParametro(opcionesPorMetodo[selectedMetodo][0]);
        setBusquedaRealizada(false);
    };

    useEffect(() => {
        if (!opcionesPorMetodo[metodo].includes(parametro)) {
            setParametro(opcionesPorMetodo[metodo][0]);
        }
        setBusquedaRealizada(false);
    }, [metodo, parametro]);

    return (
        <div className='contenedor__select'>
            <div className='select_caja'>
                <label htmlFor='metodo'>Método de búsqueda</label>
                <select name='metodo' onChange={handleMetodoBusquedaChange} value={metodo}>
                    <option value="tags">Tags</option>
                    <option value="curso">Curso</option>
                </select>
            </div>

            <div className='select_caja'>
                <label htmlFor='lista_opciones'>Selecciona el parámetro</label>
                <select name='lista_opciones' onChange={(e) => setParametro(e.target.value)} value={parametro}>
                    {opcionesPorMetodo[metodo].map((opcion, index) => (
                        <option key={index} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectBusqueda;
