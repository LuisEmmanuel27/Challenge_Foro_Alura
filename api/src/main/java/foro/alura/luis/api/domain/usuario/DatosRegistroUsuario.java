package foro.alura.luis.api.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DatosRegistroUsuario(
        @NotBlank String nombre,
        @NotBlank @Email String correo,
        @NotBlank String contraseña,
        @NotBlank String foto) {

}
