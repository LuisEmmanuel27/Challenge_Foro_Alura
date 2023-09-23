import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animation from "../../assets/lottie/animation_saludo.json";
import animation2 from "../../assets/lottie/animation_saludo2.json";
import animation3 from "../../assets/lottie/animation_tecleo.json";

const animaciones = [animation, animation2, animation3];

const AsideAnimado = () => {

    const [animationActual, setAnimationActual] = useState(0)

    useEffect(() => {
        const animationInterval = setInterval(() => {
            setAnimationActual((prevIndex) =>
                (prevIndex + 1) % animaciones.length
            );
        }, 30000);

        return () => {
            clearInterval(animationInterval);
        };
    }, []);


    return (
        <aside className='mini__aside__banner'>

            <h1>¡agrega tópicos o ayuda a otros respondiendo! 😁</h1>

            <Lottie
                className="lottie"
                animationData={animaciones[animationActual]}
                loop={true}
                autoPlay={true}
            />
        </aside>
    )
}

export default AsideAnimado