import { useState } from "react"
import { useForm } from "react-hook-form";
import { validarLogin } from "../../helper/validaciones";
import { iniciarSesion } from "../../helper/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [error, setError] = useState(false);
    const { register, handleSubmit, formState: {
        errors
    } } = useForm();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async data => {
        try {
            const RESPONSE = await iniciarSesion(data);
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
    })

    return (
        <form className='formulario' onSubmit={onSubmit}>
            <div className='input__caja'>
                <label htmlFor='login'>Nombre de usuario:</label>
                <input
                    type="text"
                    name='login'
                    autoComplete='off'
                    {...register("login", { required: true })}
                    onChange={(e) => {
                        if (!validarLogin(e.target.value)) setError(true);
                        else setError(false)
                    }}
                />
                {error && <p className="mensaje">El usuario no puede llevar espacios en blanco</p>}
                {errors.login && <p className="mensaje">El usuario no puede ir vacío</p>}
            </div>

            <div className='input__caja'>
                <label htmlFor='password'>Contraseña:</label>
                <input
                    type="password"
                    name='password'
                    autoComplete='off'
                    {...register("password", { required: true })}
                />
                {errors.password && <p className="mensaje">El password no puede ir vacío</p>}
            </div>

            <button type="submit" className='btn_principal'>iniciar sesión</button>
        </form>
    )
}

export default LoginForm