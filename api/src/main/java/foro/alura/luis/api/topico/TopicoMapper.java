package foro.alura.luis.api.topico;

import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

import foro.alura.luis.api.usuario.DatosListadoUsuario;

@Component
public class TopicoMapper {

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    public DatosListadoTopico toDatosListadoTopico(Topico topico) {
        DatosListadoUsuario DatosUsuario = new DatosListadoUsuario(
                topico.getUsuario().getNombre(),
                topico.getUsuario().getCorreo(),
                topico.getUsuario().getFoto());

        String formattedFecha = topico.getFecha().format(formatter);

        return new DatosListadoTopico(
                topico.getTitulo(),
                topico.getMensaje(),
                formattedFecha,
                topico.getEstatus(),
                topico.getTags().toString(),
                topico.getCurso().toString(),
                DatosUsuario);
    }

}
