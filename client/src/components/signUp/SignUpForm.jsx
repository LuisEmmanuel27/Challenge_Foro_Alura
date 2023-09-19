import React from 'react'

const SignUpForm = () => {
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
                <label htmlFor='email'>Correo:</label>
                <input
                    type="email"
                    name='email'
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

            <button className='btn_principal'>crear cuenta</button>
        </form>
    )
}

export default SignUpForm