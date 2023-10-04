package foro.alura.luis.api.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import jakarta.validation.Valid;

import foro.alura.luis.api.domain.usuario.Usuario;
import foro.alura.luis.api.domain.usuario.DatosAutenticacionUsuario;

import foro.alura.luis.api.infra.security.TokenService;
import foro.alura.luis.api.infra.security.DatosJWTToken;

@RestController
@RequestMapping("/login")
public class AutenticacionController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<DatosJWTToken> autenticarUsuario(
            @RequestBody @Valid DatosAutenticacionUsuario datosAutenticacionUsuario) {
        Authentication authToken = new UsernamePasswordAuthenticationToken(datosAutenticacionUsuario.login(),
                datosAutenticacionUsuario.password());

        var usuarioAutenticado = authenticationManager.authenticate(authToken);

        Usuario usuario = (Usuario) usuarioAutenticado.getPrincipal();
        var JWTtoken = tokenService.generarToken(usuario);

        DatosJWTToken response = new DatosJWTToken(JWTtoken, usuario.getId(), usuario.getLogin(),
                usuario.getEmail(),
                usuario.getFoto());

        return ResponseEntity.ok(response);
    }

}
