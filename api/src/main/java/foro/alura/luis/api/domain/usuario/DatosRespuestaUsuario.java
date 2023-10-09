package foro.alura.luis.api.domain.usuario;

public record DatosRespuestaUsuario(
        Long id,
        String login,
        String email,
        String foto,
        String jwtToken) {

}
