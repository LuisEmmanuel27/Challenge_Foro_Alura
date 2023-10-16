import Lottie from "lottie-react";
import FormCrearTop from "../components/crearTopico/FormCrearTop";
import Header from "../components/foro/Header";
import animation from "../assets/lottie/animation_escribir.json";

const EditarTopico = () => {
    return (
        <div className="creat__topic__cont">
            <Header />

            <div className='contenedor__crear'>
                <div className='lado__izq'>
                    <div className='titular'>
                        <h1>edita tu tópico</h1>
                    </div>

                    <FormCrearTop />
                </div>

                <div className='lado__der'>
                    <aside>
                        <h1>¡edita tu tópico! 😁</h1>

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

export default EditarTopico