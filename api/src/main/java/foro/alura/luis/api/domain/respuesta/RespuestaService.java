package foro.alura.luis.api.domain.respuesta;

import org.springframework.stereotype.*;

import foro.alura.luis.api.domain.usuario.Usuario;
import foro.alura.luis.api.domain.topico.Topico;
import foro.alura.luis.api.domain.topico.TopicoRepository;
import foro.alura.luis.api.domain.usuario.UsuarioRepository;

@Service
public class RespuestaService {

    private final RespuestaRepository respuestaRepository;
    private final UsuarioRepository usuarioRepository;
    private final TopicoRepository topicoRepository;

    // Constructor de la clase
    public RespuestaService(RespuestaRepository respuestaRepository, UsuarioRepository usuarioRepository,
            TopicoRepository topicoRepository) {
        this.respuestaRepository = respuestaRepository;
        this.usuarioRepository = usuarioRepository;
        this.topicoRepository = topicoRepository;
    }

    public Respuesta crearRespuesta(DatosRegistroRespuesta datosRegistroRespuesta) {
        Usuario usuario = usuarioRepository.findById(datosRegistroRespuesta.idUsuario())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        Topico topico = topicoRepository.findById(datosRegistroRespuesta.idTopico())
                .orElseThrow(() -> new IllegalArgumentException("Topico no encontrado"));

        Respuesta respuesta = new Respuesta(datosRegistroRespuesta);
        respuesta.setUsuario(usuario);
        respuesta.setTopico(topico);

        return respuestaRepository.save(respuesta);
    }

}
