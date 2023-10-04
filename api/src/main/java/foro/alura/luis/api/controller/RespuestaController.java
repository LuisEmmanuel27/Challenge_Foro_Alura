package foro.alura.luis.api.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.validation.Valid;

import foro.alura.luis.api.domain.respuesta.Respuesta;
import foro.alura.luis.api.domain.respuesta.RespuestaMapper;
import foro.alura.luis.api.domain.respuesta.RespuestaRepository;
import foro.alura.luis.api.domain.respuesta.RespuestaService;
import foro.alura.luis.api.domain.usuario.Usuario;
import foro.alura.luis.api.domain.usuario.UsuarioRepository;
import foro.alura.luis.api.domain.respuesta.DatosResponseRespuesta;
import foro.alura.luis.api.domain.respuesta.DatosListadoRespuesta;
import foro.alura.luis.api.domain.respuesta.DatosRegistroRespuesta;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/respuestas")
public class RespuestaController {

    @Autowired
    private RespuestaRepository respuestaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final RespuestaService respuestaService;
    private final RespuestaMapper respuestaMapper;

    public RespuestaController(RespuestaService respuestaService, RespuestaMapper respuestaMapper) {
        this.respuestaService = respuestaService;
        this.respuestaMapper = respuestaMapper;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<DatosResponseRespuesta> registrarRespuesta(
            @RequestBody @Valid DatosRegistroRespuesta datosRegistroRespuesta,
            UriComponentsBuilder uriComponentsBuilder) {
        Respuesta respuesta = respuestaService.crearRespuesta(datosRegistroRespuesta);

        DatosResponseRespuesta datosResponse = construirResponseRespuesta(respuesta);
        URI url = uriComponentsBuilder.path("/respuestas/{id}").buildAndExpand(respuesta.getId()).toUri();

        return ResponseEntity.created(url).body(datosResponse);
    }

    @GetMapping
    public ResponseEntity<Page<DatosListadoRespuesta>> listandoRespuestas(Pageable paginacion) {
        return ResponseEntity
                .ok(respuestaRepository.findByActivoTrue(paginacion).map(respuestaMapper::toDatosListadoRespuesta));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> eliminarRespuesta(@PathVariable Long id, Authentication authentication) {
        Respuesta respuesta = respuestaRepository.getReferenceById(id);

        Long idUsuarioDeRespuesta = respuesta.getUsuario().getId();
        Long idUsuarioDelToken = obtenerIdUsuarioDesdeToken(authentication);

        if (idUsuarioDelToken != null && idUsuarioDelToken.equals(idUsuarioDeRespuesta)) {
            respuesta.desactivarRespuesta();
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    private DatosResponseRespuesta construirResponseRespuesta(Respuesta respuesta) {
        return new DatosResponseRespuesta(respuesta.getId(), respuesta.getMensaje(), respuesta.getFecha());
    }

    private Long obtenerIdUsuarioDesdeToken(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String login = userDetails.getUsername();

        // Obtener el usuario correspondiente al login desde el repositorio
        Usuario usuario = (Usuario) usuarioRepository.findByLogin(login);

        return usuario != null ? usuario.getId() : null;
    }
}
