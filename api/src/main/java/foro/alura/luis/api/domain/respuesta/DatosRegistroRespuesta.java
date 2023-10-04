package foro.alura.luis.api.domain.respuesta;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosRegistroRespuesta(
        @NotBlank String mensaje,
        @NotNull LocalDateTime fecha,
        @NotNull Long idUsuario,
        @NotNull Long idTopico) {

}
