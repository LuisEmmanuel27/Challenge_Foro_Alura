package foro.alura.luis.api.topico;

import org.springframework.stereotype.*;

import foro.alura.luis.api.usuario.Usuario;
import foro.alura.luis.api.usuario.UsuarioRepository;

@Service
public class TopicoService {

    private final TopicoRepository topicoRepository;
    private final UsuarioRepository usuarioRepository;

    // Constructor de la clase
    public TopicoService(TopicoRepository topicoRepository, UsuarioRepository usuarioRepository) {
        this.topicoRepository = topicoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    // Método para crear un nuevo tópico
    public Topico crearTopico(DatosRegistroTopico datosRegistroTopico) {
        // Paso 1: Cargar el usuario desde el repositorio
        Usuario usuario = usuarioRepository.findById(datosRegistroTopico.idUsuario())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Paso 2: Crear un objeto Topico y asignarle el usuario
        Topico topico = new Topico(datosRegistroTopico);
        topico.setUsuario(usuario);

        // Paso 3: Guardar el tópico en el repositorio
        return topicoRepository.save(topico);
    }
}