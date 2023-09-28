package foro.alura.luis.api.domain.topico;

import org.springframework.stereotype.Component;

import foro.alura.luis.api.domain.usuario.DatosListadoUsuario;

@Component
public class TopicoMapper {

    public DatosListadoTopico toDatosListadoTopico(Topico topico) {
        DatosListadoUsuario DatosUsuario = new DatosListadoUsuario(
                topico.getUsuario().getNombre(),
                topico.getUsuario().getCorreo(),
                topico.getUsuario().getFoto());

        return new DatosListadoTopico(
                topico.getId(),
                topico.getTitulo(),
                topico.getMensaje(),
                topico.getFecha(),
                topico.getEstatus(),
                topico.getTags(),
                topico.getCurso(),
                DatosUsuario);
    }

}
