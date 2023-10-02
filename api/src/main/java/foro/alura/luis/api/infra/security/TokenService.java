package foro.alura.luis.api.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;

import foro.alura.luis.api.domain.usuario.Usuario;

@Service
public class TokenService {

    public String generarToken(Usuario usuario) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(usuario.getPassword());
            return JWT.create()
                    .withIssuer("foro alura luis")
                    .withSubject(usuario.getLogin())
                    .withClaim("id", usuario.getId())
                    .withExpiresAt(generarFechaExpiracion())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException();
        }
    }

    private Instant generarFechaExpiracion() {
        return LocalDateTime.now().plusHours(10).toInstant(ZoneOffset.of("-05:00"));
    }

}
