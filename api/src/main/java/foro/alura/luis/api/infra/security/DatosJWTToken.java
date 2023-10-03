package foro.alura.luis.api.infra.security;

public record DatosJWTToken(
        String jwtToken,
        String login,
        String email,
        String foto) {

}
