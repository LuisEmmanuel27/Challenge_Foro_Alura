package foro.alura.luis.api.topico;

import java.time.LocalDateTime;

import foro.alura.luis.api.usuario.Usuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosRegistroTopico(
        @NotBlank String titulo,
        @NotBlank String mensaje,
        @NotNull LocalDateTime fecha,
        @NotNull Boolean estatus,
        @NotBlank String tags,
        @NotBlank String curso,
        @NotNull Usuario usuario

) {

}
