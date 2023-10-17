import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { GET_USER_DATA } from '../../constants/constantes';
import { Toaster, toast } from 'react-hot-toast';
import { agregarTopico, editarTopico, obtenerTopico } from '../../helper/api';

const FormCrearTop = () => {

    const [datosTopico, setDatosTopico] = useState({
        titulo: '',
        mensaje: '',
        fecha: new Date().toISOString(),
        estatus: false,
        tags: 'OFFTOPIC',
        curso: 'PYTHON',
        idUsuario: GET_USER_DATA().id
    });
    const [datosGetTopico, setDatosGetTopico] = useState(null);
    const { jwtToken } = GET_USER_DATA();
    const navigate = useNavigate();
    const params = useParams();

    const validarTituloMensaje = (datos) => {

        const mensajeSinEtiquetas = datos.mensaje.replace(/<[^>]+>/g, ''); // Elimina todas las etiquetas HTML
        const mensajeLimpio = mensajeSinEtiquetas.trim(); // Elimina espacios en blanco al principio y al final del texto

        if (datos.titulo === '') {
            toast.error('Agrega un titulo', {
                position: "top-center",
                style: {
                    backgroundColor: "#111",
                    color: "#fff",
                }
            })
            return false;
        } else if (mensajeLimpio === '') {
            toast.error('Agrega un mensaje', {
                position: "top-center",
                style: {
                    backgroundColor: "#111",
                    color: "#fff",
                }
            })
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validarTituloMensaje(datosTopico)) {
            try {
                const response = await agregarTopico(jwtToken, datosTopico);
                console.log("topico agregado: ", response.data);

                navigate('/foro');
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        if (validarTituloMensaje(datosGetTopico)) {
            try {
                const dataToSend = {
                    titulo: datosGetTopico.titulo,
                    mensaje: datosGetTopico.mensaje
                };

                const response = await editarTopico(jwtToken, params.id, dataToSend);
                console.log(response);

                navigate('/foro');
            } catch (error) {
                console.log(error.message);
            }
        }
    };


    const llamarTopico = async () => {
        try {
            const data = (await obtenerTopico(jwtToken, params.id)).data;
            console.log(JSON.stringify(data));
            setDatosGetTopico(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.id) {
            llamarTopico();
        }
    }, [params.id])

    return (
        <form className='contenedor__form__nuvTopico' onSubmit={params?.id ? handleEdit : handleSubmit}>
            <div className='titulo'>
                <h2>ingresa el titulo:</h2>
                <input
                    type="text"
                    id='titulo'
                    name='titulo'
                    onChange={(e) => {
                        if (datosGetTopico?.titulo) {
                            setDatosGetTopico({ ...datosGetTopico, titulo: e.target.value })
                        } else {
                            setDatosTopico({ ...datosTopico, titulo: e.target.value })
                        }
                    }}
                    value={datosGetTopico ? datosGetTopico?.titulo : datosTopico?.titulo}
                />
            </div>

            <div className='topic_curso'>
                <h2>
                    selecciona el tipo de tópico y curso:
                </h2>

                <div className='select_cont'>
                    <select
                        onChange={(e) => setDatosTopico((prevDatosTopico) => ({
                            ...prevDatosTopico,
                            tags: e.target.value
                        }))}
                        value={datosGetTopico ? datosGetTopico?.tags : datosTopico?.tags}
                        disabled={params.id ? true : false}
                    >
                        <option value="OFFTOPIC">off_topic</option>
                        <option value="DUDA">duda</option>
                        <option value="PROGRAMACION">programación</option>
                    </select>


                    <select
                        onChange={(e) => setDatosTopico((prevDatosTopico) => ({
                            ...prevDatosTopico,
                            curso: e.target.value
                        }))}
                        value={datosGetTopico ? datosGetTopico?.curso : datosTopico?.curso}
                        disabled={params.id ? true : false}
                    >
                        <option value="PYTHON">python</option>
                        <option value="JAVA">java</option>
                        <option value="JAVASCRIPT">JavaScript</option>
                    </select>
                </div>
            </div>

            <ReactQuill
                theme="snow"
                value={datosGetTopico ? datosGetTopico?.mensaje : datosTopico?.mensaje}
                onChange={(content) => {
                    if (datosGetTopico?.mensaje) {
                        setDatosGetTopico({ ...datosGetTopico, mensaje: content })
                    } else {
                        setDatosTopico({ ...datosTopico, mensaje: content })
                    }
                }}
            />

            <div className='btn__contenedor'>
                <Link to="/foro">
                    <button className='btn_principal'>regresar</button>
                </Link>

                <button className='btn_principal' type='submit'>
                    {params.id ? "editar" : "enviar"}
                </button>
            </div>

            <Toaster />
        </form>
    )
}

export default FormCrearTop