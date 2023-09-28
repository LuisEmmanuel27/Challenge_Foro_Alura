package foro.alura.luis.api.topico;

import foro.alura.luis.api.usuario.DatosListadoUsuario;

public record DatosListadoTopico(
        Long id,
        String titulo,
        String mensaje,
        String fecha,
        Boolean estatus,
        String tags,
        String curso,
        DatosListadoUsuario DatosUsuario) {

}
