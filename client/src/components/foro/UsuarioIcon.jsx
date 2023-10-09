import { Link } from "react-router-dom";
import perfil from "../../assets/perfilExample.png";

const UsuarioIcon = () => {

    const activarDropDownMenu = () => {
        document.querySelector('.drop_down_menu').classList.toggle("active");
    }

    const handleLogout = () => {
        localStorage.clear();
    }

    return (
        <div className="usuario" onClick={activarDropDownMenu}>
            <div className="img">
                <img src={perfil} alt="perfil" />
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