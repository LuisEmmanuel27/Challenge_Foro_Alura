import { useState } from "react";
import { storage } from "../../scripts/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const InputFoto = ({ datosLog, setDatosLog }) => {

    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");

    const handleUpladingFoto = (e) => {
        const file = e.target.files[0]; // Obtener el archivo seleccionado

        // Verificar si datosLog.login es una cadena no vacía y si se seleccionó un archivo
        if (datosLog.login && file) {
            const storageRef = ref(storage, datosLog.login);

            const uploadTask = uploadBytesResumable(storageRef, file);

            setUploading(true);
            setUploadMessage("Subiendo imagen...");

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                (error) => {
                    console.log(error);
                    setUploading(false);
                    setUploadMessage("Error al subir imagen");
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // Llama a una función de devolución de llamada para manejar la URL
                        handleImageUrl(downloadURL);
                        setUploading(false);
                        setUploadMessage("Imagen subida con éxito");
                    });
                }
            );
        } else {
            console.log("Datos de usuario o archivo no válidos.");
        }
    }

    const handleImageUrl = (imageUrl) => {
        // Actualiza el estado de datosLog con la URL de la imagen
        setDatosLog({ ...datosLog, foto: imageUrl });
    }

    return (
        <div className='input__caja__foto'>
            <label htmlFor='foto'>Foto de perfil:</label>
            <input
                type="file"
                name='foto'
                accept='.jpg, .jpeg, .png'
                onChange={handleUpladingFoto}
            />
            {uploading && <div className="loader">Cargando...</div>}
            {uploadMessage && <p className='mensaje'>{uploadMessage}</p>}
        </div>
    )
}

export default InputFoto
