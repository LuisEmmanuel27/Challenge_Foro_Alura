const LoginForm = () => {
    return (
        <form className='formulario'>
            <div className='input__caja'>
                <label htmlFor='nombre_usuario'>Nombre de usuario:</label>
                <input
                    type="text"
                    name='nombre_usuario'
                    autoComplete='off'
                />
            </div>

            <div className='input__caja'>
                <label htmlFor='password'>Contraseña:</label>
                <input
                    type="password"
                    name='password'
                    autoComplete='off'
                />
            </div>

            <button className='btn_principal'>iniciar sesión</button>
        </form>
    )
}

export default LoginForm