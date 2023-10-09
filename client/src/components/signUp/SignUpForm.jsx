import React, { useState } from 'react'
import InputFoto from './InputFoto';
import { validarEmail, validarLogin, validarPass } from '../../helper/validaciones';
import { crearUsuario } from '../../helper/api';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {

    const navigate = useNavigate();
    const [datosLog, setDatosLog] = useState({
        login: null,
        email: null,
        password: null,
        foto: null,
    });
    const [loginError, setLoginError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("La contraseña debe contener al menos una mayúscula y un número, maximo 10 caracteres");
    const { register, formState: {
        errors
    } } = useForm();

    const handleInputFormChange = (e) => {
        const { name, value } = e.target;
        setDatosLog({ ...datosLog, [name]: value });

        if (name === "login") {
            !validarLogin(value) ? setLoginError("El nombre de usuario no puede llevar espacios") : setLoginError("");
        }

        if (name === "email") {
            !validarEmail(value) ? setEmailError("Ingrese un email valido por favor") : setEmailError("");
        }

        if (name === "password") {
            !validarPass(value) ? setPassError("Ingresa una contraseña valida") : setPassError("");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const RESPONSE = await crearUsuario(datosLog);
            const USER_DATA_JSON = JSON.stringify(RESPONSE);

            localStorage.setItem('userData', USER_DATA_JSON);

            const authToken = localStorage.getItem("userData");
            console.log(authToken);

            navigate('/foro');
        } catch (error) {
            toast.error(error, {
                position: "bottom-right",
                style: {
                    backgroundColor: "#333",
                    color: "red"
                }
            })
        }
    }

    return (
        <form className='formulario' onSubmit={handleSubmit}>
            <div className='input__caja'>
                <label htmlFor='login'>Nombre de usuario:</label>
                <input
                    type="text"
                    name='login'
                    autoComplete='off'
                    {...register("login", { required: true })}
                    onChange={handleInputFormChange}
                />
                {loginError && <p className='mensaje'>{loginError}</p>}
                {errors.login && <p className='mensaje msj2'>No dejes el campo vacio</p>}
            </div>

            <div className='input__caja'>
                <label htmlFor='email'>Correo:</label>
                <input
                    type="email"
                    name='email'
                    autoComplete='off'
                    {...register("email", { required: true })}
                    onChange={handleInputFormChange}
                />
                {emailError && <p className='mensaje'>{emailError}</p>}
                {errors.email && <p className='mensaje msj2'>No dejes el campo vacio</p>}
            </div>

            <div className='input__caja'>
                <label htmlFor='password'>Contraseña:</label>
                <input
                    type="password"
                    name='password'
                    autoComplete='off'
                    {...register("password", { required: true })}
                    onChange={handleInputFormChange}
                />
                <p className='mensaje'>{passError}</p>
                {errors.password && <p className='mensaje msj2'>No dejes el campo vacio</p>}
            </div>

            <InputFoto datosLog={datosLog} setDatosLog={setDatosLog} />

            <button type='submit' className='btn_principal'>crear cuenta</button>
        </form>
    )
}

export default SignUpForm