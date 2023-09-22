import { useState } from 'react'

const SelectBusqueda = () => {

    const [metodoBusqueda, setMetodoBusqueda] = useState("topico");
    const [opcionesLista, setOpcionesLista] = useState(["Duda", "Programación", "Off Topic"]);

    // Función para manejar el cambio en el primer select
    const handleMetodoBusquedaChange = (e) => {
        const selectedMetodo = e.target.value;
        setMetodoBusqueda(selectedMetodo);

        // Actualiza las opciones en el segundo select según la elección
        if (selectedMetodo === "topico") {
            setOpcionesLista(["Duda", "Programación", "Off Topic"]);
        } else if (selectedMetodo === "curso") {
            setOpcionesLista(["Java", "JavaScript", "Python"]);
        }
    };

    return (
        <div className='contenedor__select'>
            <div className='select_caja'>
                <label htmlFor='metodo'>Método de búsqueda</label>
                <select name='metodo' onChange={handleMetodoBusquedaChange} value={metodoBusqueda}>
                    <option value="topico">Tópico</option>
                    <option value="curso">Curso</option>
                </select>
            </div>

            <div className='select_caja'>
                <label htmlFor='lista_opciones'>Selecciona el método/curso</label>
                <select name='lista_opciones'>
                    {opcionesLista.map((opcion, index) => (
                        <option key={index} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default SelectBusqueda