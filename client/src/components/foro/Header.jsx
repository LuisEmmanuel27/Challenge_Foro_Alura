import logo from "../../assets/picon.png";
import UsuarioIcon from "./UsuarioIcon";

const Header = () => {
    return (
        <header className="header">
            <div className='logo'>
                <picture>
                    <img src={logo} alt="logo" />
                </picture>
                <span>Foro Alura</span>
            </div>

            <UsuarioIcon />
        </header>
    )
}

export default Header