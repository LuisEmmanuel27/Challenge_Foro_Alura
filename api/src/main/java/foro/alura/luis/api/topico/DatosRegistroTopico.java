package foro.alura.luis.api.topico;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosRegistroTopico(
        @NotBlank String titulo,
        @NotBlank String mensaje,
        @NotNull LocalDateTime fecha,
        @NotNull Boolean estatus,
        @NotNull Tags tags,
        @NotNull Cursos curso,
        @NotNull Long idUsuario

) {

}
