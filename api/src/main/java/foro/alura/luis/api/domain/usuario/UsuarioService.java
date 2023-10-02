package foro.alura.luis.api.domain.usuario;

import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(DatosRegistroUsuario datosRegistroUsuario) {
        String passwordEncoded = passwordEncoder.encode(datosRegistroUsuario.password());

        Usuario usuario = new Usuario(
                datosRegistroUsuario.login(),
                datosRegistroUsuario.email(),
                passwordEncoded,
                datosRegistroUsuario.foto());

        return usuarioRepository.save(usuario);

    }
}
