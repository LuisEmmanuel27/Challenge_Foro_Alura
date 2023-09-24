import Header from '../components/foro/Header';
import Lottie from 'lottie-react';
import animation from "../assets/lottie/animation_escribir.json";
import FormCrearTop from '../components/crearTopico/FormCrearTop';

const CrearTopic = () => {
    return (
        <div className='creat__topic__cont'>
            <Header />

            <div className='contenedor__crear'>
                <div className='lado__izq'>
                    <div className='titular'>
                        <h1>crea tu tópico</h1>
                    </div>

                    <FormCrearTop />
                </div>

                <div className='lado__der'>
                    <aside>
                        <h1>¡agrega tu tópico! 😁</h1>

                        <Lottie
                            animationData={animation}
                            loop={true}
                            autoPlay={true}
                        />
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default CrearTopic