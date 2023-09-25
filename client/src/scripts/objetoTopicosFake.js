import User1 from "../assets/usuarios/User1.png";
import User2 from "../assets/usuarios/User2.png";
import User3 from "../assets/usuarios/User3.png";
import User4 from "../assets/usuarios/User4.png";
import User5 from "../assets/usuarios/User5.png";
import User6 from "../assets/usuarios/User6.png";
import User7 from "../assets/usuarios/User7.png";
import User8 from "../assets/usuarios/User8.png";
import User9 from "../assets/usuarios/User9.png";
import User10 from "../assets/usuarios/User10.png";
import UserRes from "../assets/usuarios/respuestaUser.png";

export const topicoDataFake = [
    {
        id: 1,
        titulo: "Tópico 1",
        mensaje: "Eiusmod anim minim ut elit velit exercitation officia ut deserunt incididunt ex mollit. Consectetur laborum sunt tempor id in occaecat Lorem labore cillum nisi. Fugiat eu tempor laborum excepteur. Eiusmod enim Lorem ex magna cupidatat consectetur cillum ad incididunt. Mollit tempor ad eu proident magna in ipsum ullamco reprehenderit proident consectetur in consequat. Irure cillum occaecat incididunt voluptate velit quis.",
        contenido: "Este es el contenido del tópico 1.",
        fecha: "13/11/2023", // dd/mm/yyyy
        estatus: true,
        autor: "Autor1",
        curso: "java",
        tags: "duda",
        foto: User1,
        respuestas: [
            {
                id: 101,
                mensaje: "Cupidatat Lorem amet dolore enim laboris nisi Lorem mollit culpa quis exercitation. Cillum amet ex culpa laboris cillum tempor consequat labore laboris laboris quis exercitation nisi. Pariatur deserunt adipisicing aute et. Velit sunt et proident consequat dolor magna esse aute esse ea sit irure dolor dolore.",
                autor: "Usuario1",
                fecha: "14/11/2023",
                foto: UserRes
            },
            {
                id: 102,
                mensaje: "Respuesta 2 al Tópico 1",
                autor: "Usuario2",
                fecha: "15/11/2023",
                foto: UserRes
            }
        ]
    },
    {
        id: 2,
        titulo: "Tópico 2",
        mensaje: "Mensaje del tópico 2...",
        contenido: "Este es el contenido del tópico 2.",
        fecha: "14/11/2023",
        estatus: false,
        autor: "Autor2",
        curso: "python",
        tags: "programacion",
        respuestas: [],
        foto: User2,
    },
    {
        id: 3,
        titulo: "Tópico 3",
        mensaje: "Mensaje del tópico 3...",
        contenido: "Este es el contenido del tópico 3.",
        fecha: "15/11/2023",
        estatus: false,
        autor: "Autor3",
        curso: "javascript",
        tags: "duda",
        respuestas: [],
        foto: User3,
    },
    {
        id: 4,
        titulo: "Tópico 4",
        mensaje: "Mensaje del tópico 4...",
        contenido: "Este es el contenido del tópico 4.",
        fecha: "16/11/2023",
        estatus: true,
        autor: "Autor4",
        curso: "java",
        tags: "off_topic",
        foto: User4,
        respuestas: [
            {
                id: 103,
                mensaje: "Respuesta 1 al Tópico 4",
                autor: "Usuario3",
                fecha: "17/11/2023",
                foto: UserRes
            }
        ]
    },
    {
        id: 5,
        titulo: "Tópico 5",
        mensaje: "Mensaje del tópico 5...",
        contenido: "Este es el contenido del tópico 5.",
        fecha: "17/11/2023",
        estatus: true,
        autor: "Autor5",
        curso: "python",
        tags: "programacion",
        foto: User5,
        respuestas: [
            {
                id: 104,
                mensaje: "Respuesta 1 al Tópico 5",
                autor: "Usuario3",
                fecha: "17/11/2023",
                foto: UserRes
            },
            {
                id: 105,
                mensaje: "Respuesta 2 al Tópico 5",
                autor: "Usuario7",
                fecha: "18/11/2023",
                foto: UserRes
            },
            {
                id: 106,
                mensaje: "Respuesta 3 al Tópico 5",
                autor: "Usuario8",
                fecha: "20/11/2023",
                foto: UserRes
            },
        ],
    },
    {
        id: 6,
        titulo: "Tópico 6",
        mensaje: "Mensaje del tópico 6...",
        contenido: "Este es el contenido del tópico 6.",
        fecha: "18/11/2023",
        estatus: true,
        autor: "Autor6",
        curso: "javascript",
        tags: "off_topic",
        respuestas: [],
        foto: User6,
    },
    {
        id: 7,
        titulo: "Tópico 7",
        mensaje: "Mensaje del tópico 7...",
        contenido: "Este es el contenido del tópico 7.",
        fecha: "19/11/2023",
        estatus: false,
        autor: "Autor7",
        curso: "java",
        tags: "duda",
        respuestas: [],
        foto: User7,
    },
    {
        id: 8,
        titulo: "Tópico 8",
        mensaje: "Mensaje del tópico 8...",
        contenido: "Este es el contenido del tópico 8.",
        fecha: "20/11/2023",
        estatus: false,
        autor: "Autor8",
        curso: "python",
        tags: "programacion",
        respuestas: [],
        foto: User8,
    },
    {
        id: 9,
        titulo: "Tópico 9",
        mensaje: "Mensaje del tópico 9...",
        contenido: "Este es el contenido del tópico 9.",
        fecha: "21/11/2023",
        estatus: true,
        autor: "Autor9",
        curso: "javascript",
        tags: "duda",
        foto: User9,
        respuestas: [
            {
                id: 107,
                mensaje: "Respuesta 1 al Tópico 5",
                autor: "Usuario9",
                fecha: "21/11/2023",
                foto: UserRes
            },
            {
                id: 108,
                mensaje: "Respuesta 2 al Tópico 5",
                autor: "Usuario10",
                fecha: "21/11/2023",
                foto: UserRes
            },
        ],
    },
    {
        id: 10,
        titulo: "Tópico 10",
        mensaje: "Mensaje del tópico 10...",
        contenido: "Este es el contenido del tópico 10.",
        fecha: "22/11/2023",
        estatus: false,
        autor: "Autor10",
        curso: "java",
        tags: "off_topic",
        foto: User10,
        respuestas: [],
    }
];
