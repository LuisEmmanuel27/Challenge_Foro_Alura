package foro.alura.luis.api.topico;

import java.time.LocalDateTime;

public record DatosRespuestaTopico(
        Long id,
        String titulo,
        String mensaje,
        LocalDateTime fecha,
        Boolean estatus,
        Tags tags,
        Cursos curso) {

}
