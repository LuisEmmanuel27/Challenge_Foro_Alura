package foro.alura.luis.api.controller;

import java.net.URI;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

import foro.alura.luis.api.domain.respuesta.Respuesta;
// import foro.alura.luis.api.domain.respuesta.RespuestaRepository;
import foro.alura.luis.api.domain.respuesta.RespuestaService;
import foro.alura.luis.api.domain.respuesta.DatosResponseRespuesta;
import foro.alura.luis.api.domain.respuesta.DatosRegistroRespuesta;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/respuestas")
public class RespuestaController {

    // @Autowired
    // private RespuestaRepository respuestaRepository;

    private final RespuestaService respuestaService;

    public RespuestaController(RespuestaService respuestaService) {
        this.respuestaService = respuestaService;
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

    private DatosResponseRespuesta construirResponseRespuesta(Respuesta respuesta) {
        return new DatosResponseRespuesta(respuesta.getId(), respuesta.getMensaje(), respuesta.getFecha());
    }
}
