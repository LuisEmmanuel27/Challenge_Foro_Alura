package foro.alura.luis.api.domain.respuesta;

import java.time.LocalDateTime;

import foro.alura.luis.api.domain.usuario.DatosListadoUsuario;
import foro.alura.luis.api.domain.respuesta.RespuestaMapper.NuevoDatoTopico;

public record DatosListadoRespuesta(
        Long id,
        String mensaje,
        LocalDateTime fecha,
        DatosListadoUsuario datosUsuario,
        NuevoDatoTopico datosTopico) {

}
