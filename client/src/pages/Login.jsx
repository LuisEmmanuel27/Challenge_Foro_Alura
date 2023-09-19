import React from 'react'
import { Link } from 'react-router-dom'
import videoMen from "../assets/videollamadaMen.png";
import videoGirl from "../assets/videollamadaGirl.png";
import LoginForm from '../components/login/LoginForm';

const Login = () => {
    return (
        <div className="Login">

            <img src={videoMen} alt="video_men" />
            <img src={videoGirl} alt="video_girl" />

            <div className='contenedor__form'>

                <h1 className='titular'>inicio de sesión</h1>

                <LoginForm />

                <div className='mensaje'>
                    <p>¿No tienes una cuenta? Entonces crea una 😁</p>
                    <Link to="/sign_up">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login