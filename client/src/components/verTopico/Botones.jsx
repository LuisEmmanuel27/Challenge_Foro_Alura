import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { eliminarTopico } from '../../helper/api'
import { GET_USER_DATA } from '../../constants/constantes'

const Botones = ({ idTopico }) => {

    const { jwtToken } = GET_USER_DATA();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('Realmente quieres eliminar tu tipico?')) {
            try {
                const response = await eliminarTopico(jwtToken, idTopico);
                console.log(response);
                navigate('/foro');
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="caja__btn">
            <Link to={`/foro/editar/${idTopico}`}>
                <button className="editar">editar</button>
            </Link>

            <button className="eliminar" onClick={handleDelete}>eliminar</button>
        </div>
    )
}

export default Botones