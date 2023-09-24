import 'react-quill/dist/quill.snow.css';
import QuillComp from './QuillComp';
import { Link } from 'react-router-dom';

const FormCrearTop = () => {


    return (
        <div className='contenedor__form__nuvTopico'>
            <div className='titulo'>
                <h2>ingresa el titulo:</h2>
                <input type="text" id='titulo' name='titulo' />
            </div>

            <div className='topic_curso'>
                <h2>
                    selecciona el tipo de tópico y curso:
                </h2>

                <div className='select_cont'>
                    <select>
                        <option value="off_topic" key="1">off_topic</option>
                        <option value="duda" key="2">duda</option>
                        <option value="programacion" key="3">programación</option>
                    </select>

                    <select>
                        <option value="python" key="1">python</option>
                        <option value="java" key="2">java</option>
                        <option value="javascript" key="3">JavaScript</option>
                    </select>
                </div>
            </div>

            <QuillComp />

            <div className='btn__contenedor'>
                <Link to="/foro">
                    <button className='btn_principal'>regresar</button>
                </Link>

                <button className='btn_principal'>enviar</button>
            </div>
        </div>
    )
}

export default FormCrearTop