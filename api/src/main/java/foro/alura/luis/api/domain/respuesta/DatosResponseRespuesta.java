package foro.alura.luis.api.domain.respuesta;

import java.time.LocalDateTime;

public record DatosResponseRespuesta(
        Long id,
        String mensaje,
        LocalDateTime fecha) {

}
