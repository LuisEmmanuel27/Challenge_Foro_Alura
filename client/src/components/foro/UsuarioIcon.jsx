import perfil from "../../assets/perfilExample.png";

const UsuarioIcon = () => {

    const activarDropDownMenu = () => {
        document.querySelector('.drop_down_menu').classList.toggle("active");
    }

    return (
        <div className="usuario" onClick={activarDropDownMenu}>
            <div className="img">
                <img src={perfil} alt="perfil" />
            </div>

            <div className="drop_down_menu">
                <button>cerrar sesión</button>
            </div>
        </div>
    )
}

export default UsuarioIcon