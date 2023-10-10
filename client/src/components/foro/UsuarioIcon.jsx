import { Link } from "react-router-dom";
import { GET_USER_DATA } from "../../constants/constantes";

const UsuarioIcon = () => {

    const activarDropDownMenu = () => {
        document.querySelector('.drop_down_menu').classList.toggle("active");
    }

    const handleLogout = () => {
        localStorage.clear();
    }

    const { foto } = GET_USER_DATA();

    return (
        <div className="usuario" onClick={activarDropDownMenu}>
            <div className="img">
                <img src={foto} alt="perfil" />
            </div>

            <Link to="/">
                <div className="drop_down_menu">
                    <button onClick={handleLogout}>cerrar sesión</button>
                </div>
            </Link>
        </div>
    )
}

export default UsuarioIcon