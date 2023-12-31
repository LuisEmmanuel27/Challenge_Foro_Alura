package foro.alura.luis.api.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.security.core.Authentication;

import foro.alura.luis.api.domain.topico.Cursos;
import foro.alura.luis.api.domain.topico.DatosActualizarTopico;
import foro.alura.luis.api.domain.topico.DatosBuscarTopico;
import foro.alura.luis.api.domain.topico.DatosListadoTopico;
import foro.alura.luis.api.domain.topico.DatosRegistroTopico;
import foro.alura.luis.api.domain.topico.DatosRespuestaTopico;
import foro.alura.luis.api.domain.topico.Tags;
import foro.alura.luis.api.domain.topico.Topico;
import foro.alura.luis.api.domain.topico.TopicoMapper;
import foro.alura.luis.api.domain.topico.TopicoRepository;
import foro.alura.luis.api.domain.topico.TopicoService;
import foro.alura.luis.api.domain.usuario.Usuario;
import foro.alura.luis.api.domain.usuario.UsuarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/topicos")
public class TopicoController {

    @Autowired
    private TopicoRepository topicoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final TopicoService topicoService;
    private final TopicoMapper topicoMapper;

    public TopicoController(TopicoService topicoService, TopicoMapper topicoMapper) {
        this.topicoService = topicoService;
        this.topicoMapper = topicoMapper;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<DatosRespuestaTopico> registrarTopico(
            @RequestBody @Valid DatosRegistroTopico datosRegistroTopico, UriComponentsBuilder uriComponentsBuilder) {
        Topico topico = topicoService.crearTopico(datosRegistroTopico);

        DatosRespuestaTopico datosRespuestaTopico = construirDatosRespuestaTopico(topico);
        URI url = uriComponentsBuilder.path("/topicos/{id}").buildAndExpand(topico.getId()).toUri();

        return ResponseEntity.created(url).body(datosRespuestaTopico);
    }

    @GetMapping
    public ResponseEntity<Page<DatosListadoTopico>> listandoTopicos(Pageable paginacion) {
        return ResponseEntity.ok(topicoRepository.findByActivoTrue(paginacion).map(topicoMapper::toDatosListadoTopico));
    }

    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<DatosRespuestaTopico> actualizarTopico(@PathVariable Long id,
            @RequestBody @Valid DatosActualizarTopico datosActualizarTopico,
            Authentication authentication) {

        Topico topico = topicoRepository.getReferenceById(id);

        Long idUsuarioDelTopico = topico.getUsuario().getId();
        Long idUsuarioDelToken = obtenerIdUsuarioDesdeToken(authentication);

        if (idUsuarioDelToken != null && idUsuarioDelToken.equals(idUsuarioDelTopico)) {
            // Realizar la actualización del tópico
            topico.actualizarDatos(datosActualizarTopico);

            DatosRespuestaTopico datosRespuestaTopico = new DatosRespuestaTopico(
                    topico.getId(),
                    topico.getTitulo(),
                    topico.getMensaje(),
                    topico.getFecha(),
                    topico.getEstatus(),
                    topico.getTags(),
                    topico.getCurso());

            return ResponseEntity.ok(datosRespuestaTopico);
        } else {
            // El usuario no tiene permiso para actualizar este tópico
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> eliminarTopico(@PathVariable Long id, Authentication authentication) {
        Topico topico = topicoRepository.getReferenceById(id);

        Long idUsuarioDelTopico = topico.getUsuario().getId();
        Long idUsuarioDelToken = obtenerIdUsuarioDesdeToken(authentication);

        if (idUsuarioDelToken != null && idUsuarioDelToken.equals(idUsuarioDelTopico)) {
            topico.desactivarTopico();
            return ResponseEntity.noContent().build();
        } else {
            // El usuario no tiene permiso para eliminar este tópico
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatosRespuestaTopico> retornaDatosTopico(@PathVariable Long id) {
        Topico topico = topicoRepository.getReferenceById(id);

        DatosRespuestaTopico datosRespuestaTopico = new DatosRespuestaTopico(id, topico.getTitulo(),
                topico.getMensaje(), topico.getFecha(), topico.getEstatus(), topico.getTags(),
                topico.getCurso());

        return ResponseEntity.ok(datosRespuestaTopico);
    }

    @PostMapping("/buscar")
    public ResponseEntity<Page<DatosListadoTopico>> buscarPorTagsYCurso(
            @RequestBody @Valid DatosBuscarTopico datosBuscarTopico, Pageable paginacion) {
        Tags tags = datosBuscarTopico.tags();
        Cursos curso = datosBuscarTopico.curso();

        Page<Topico> resultados;

        if (tags != null && curso != null) {
            // Realizar búsqueda por ambos parámetros.
            resultados = topicoRepository.findByTagsAndCursoAndActivoTrue(tags, curso, paginacion);
        } else if (tags != null) {
            // Realizar búsqueda por tags.
            resultados = topicoRepository.findByTagsAndActivoTrue(tags, paginacion);
        } else if (curso != null) {
            // Realizar búsqueda por curso.
            resultados = topicoRepository.findByCursoAndActivoTrue(curso, paginacion);
        } else {
            // No se especificaron parámetros válidos
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok(resultados.map(topicoMapper::toDatosListadoTopico));
    }

    private DatosRespuestaTopico construirDatosRespuestaTopico(Topico topico) {
        return new DatosRespuestaTopico(topico.getId(), topico.getTitulo(), topico.getMensaje(), topico.getFecha(),
                topico.getEstatus(), topico.getTags(), topico.getCurso());

    }

    private Long obtenerIdUsuarioDesdeToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String login = userDetails.getUsername();

        // Obtener el usuario correspondiente al login desde el repositorio
        Usuario usuario = (Usuario) usuarioRepository.findByLogin(login);

        return usuario != null ? usuario.getId() : null;
    }

}
