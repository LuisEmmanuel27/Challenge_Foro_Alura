package foro.alura.luis.api.topico;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosRegistroTopico(
        @NotBlank String titulo,
        @NotBlank String mensaje,
        @NotNull LocalDateTime fecha,
        @NotNull Boolean estatus,
        @NotBlank String tags,
        @NotBlank String curso,
        @NotNull @JsonProperty("id_usuario") Long idUsuario

) {

}
