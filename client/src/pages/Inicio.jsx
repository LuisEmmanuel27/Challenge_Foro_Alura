import { Link } from 'react-router-dom';
import imgForo from "../assets/inicioForo.png";
import imgForo2 from "../assets/inicioForo2.png";
import imgForo3 from "../assets/inicioForo3.png";
import imgForo4 from "../assets/inicioForo4.png";
import '../scss/global.scss';

const Inicio = () => {

    const IMAGENES = [imgForo, imgForo2, imgForo3, imgForo4];

    return (
        <div className='Pagina__Inicio'>
            <div className='lado__izquierdo'>
                <h1>bienvenidos al foro de alura</h1>
                <h2>donde puedes hablar de cualquier tema en cualquier momento</h2>

                <nav className='caja_btn_nav'>
                    <Link to="/login"><button className='btn_principal link_1'>Iniciar sesión</button></Link>
                    <Link to="/sign_up"><button className='btn_principal link_2'>Crear cuenta</button></Link>
                </nav>
            </div>

            <div className='lado__derecho'>
                {
                    IMAGENES.map((imagen, index) => {
                        return (
                            <div className={`pic_${index + 1}`} key={index}>
                                <img src={imagen} alt={`inicio_foro_${index}`} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Inicio