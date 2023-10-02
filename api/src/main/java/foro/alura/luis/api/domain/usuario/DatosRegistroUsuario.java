package foro.alura.luis.api.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DatosRegistroUsuario(
        @NotBlank String login,
        @NotBlank @Email String email,
        @NotBlank String password,
        @NotBlank String foto) {

}
