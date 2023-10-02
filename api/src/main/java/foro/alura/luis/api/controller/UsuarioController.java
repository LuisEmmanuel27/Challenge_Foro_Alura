package foro.alura.luis.api.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import foro.alura.luis.api.domain.usuario.DatosRegistroUsuario;
import foro.alura.luis.api.domain.usuario.DatosRespuestaUsuario;
import foro.alura.luis.api.domain.usuario.Usuario;
import foro.alura.luis.api.domain.usuario.UsuarioRepository;
import foro.alura.luis.api.domain.usuario.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<DatosRespuestaUsuario> registrarUsuario(
            @RequestBody @Valid DatosRegistroUsuario datosRegistroUsuario, UriComponentsBuilder uriComponentsBuilder) {

        Usuario usuario = usuarioService.registrarUsuario(datosRegistroUsuario);

        DatosRespuestaUsuario datosRespuestaUsuario = construirDatosRespuestaUsuario(usuario);
        URI url = uriComponentsBuilder.path("/usuarios/{id}").buildAndExpand(usuario.getId()).toUri();

        return ResponseEntity.created(url).body(datosRespuestaUsuario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatosRespuestaUsuario> retornaDatosUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.getReferenceById(id);

        DatosRespuestaUsuario datosRespuestaUsuario = new DatosRespuestaUsuario(usuario.getId(), usuario.getLogin(),
                usuario.getEmail());

        return ResponseEntity.ok(datosRespuestaUsuario);
    }

    private DatosRespuestaUsuario construirDatosRespuestaUsuario(Usuario usuario) {
        return new DatosRespuestaUsuario(usuario.getId(), usuario.getLogin(), usuario.getEmail());
    }
}
