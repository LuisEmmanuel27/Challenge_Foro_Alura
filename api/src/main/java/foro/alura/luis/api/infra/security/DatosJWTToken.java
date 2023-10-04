package foro.alura.luis.api.infra.security;

public record DatosJWTToken(
        String jwtToken,
        Long id,
        String login,
        String email,
        String foto) {

}
