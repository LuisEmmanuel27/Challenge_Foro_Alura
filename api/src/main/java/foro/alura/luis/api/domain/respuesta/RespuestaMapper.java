package foro.alura.luis.api.domain.respuesta;

import org.springframework.stereotype.Component;

import foro.alura.luis.api.domain.usuario.DatosListadoUsuario;

@Component
public class RespuestaMapper {
    public DatosListadoRespuesta toDatosListadoRespuesta(Respuesta respuesta) {
        DatosListadoUsuario datosUsuario = new DatosListadoUsuario(
                respuesta.getUsuario().getLogin(),
                respuesta.getUsuario().getEmail(),
                respuesta.getUsuario().getFoto());

        NuevoDatoTopico datosTopico = new NuevoDatoTopico(
                respuesta.getTopico().getId());

        return new DatosListadoRespuesta(
                respuesta.getId(),
                respuesta.getMensaje(),
                respuesta.getFecha(),
                datosUsuario,
                datosTopico);
    }

    public record NuevoDatoTopico(
            Long id) {
    }
}