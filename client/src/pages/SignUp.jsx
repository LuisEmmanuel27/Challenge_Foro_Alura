import { Link } from "react-router-dom";
import helloBubb from "../assets/helloBubble.png";
import omgBubb from "../assets/omgBubble.png";
import SignUpForm from "../components/signUp/SignUpForm";

const SignUp = () => {
    return (
        <div className='SignUp'>

            <img src={omgBubb} alt="omg_bubble" />
            <img src={helloBubb} alt="hello_bubble" />

            <div className="contenedor__form">

                <h1 className='titular'>crear cuenta</h1>

                <SignUpForm />

                <div className='mensaje'>
                    <p>¿Ya tienes una cuenta? Entonces inicia sesión 😁</p>
                    <Link to="/login">Login</Link>
                </div>
            </div>

        </div>
    )
}

export default SignUp