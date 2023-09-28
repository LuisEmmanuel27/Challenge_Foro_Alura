package foro.alura.luis.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import foro.alura.luis.api.domain.usuario.DatosRegistroUsuario;
import foro.alura.luis.api.domain.usuario.Usuario;
import foro.alura.luis.api.domain.usuario.UsuarioRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public void registrarUsuario(@RequestBody @Valid DatosRegistroUsuario datosRegistroUsuario) {
        usuarioRepository.save(new Usuario(datosRegistroUsuario));
    }
}
