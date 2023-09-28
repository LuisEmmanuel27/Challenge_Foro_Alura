package foro.alura.luis.api.topico;

import java.time.LocalDateTime;

import foro.alura.luis.api.usuario.DatosListadoUsuario;

public record DatosListadoTopico(
        Long id,
        String titulo,
        String mensaje,
        LocalDateTime fecha,
        Boolean estatus,
        Tags tags,
        Cursos curso,
        DatosListadoUsuario DatosUsuario) {

}
