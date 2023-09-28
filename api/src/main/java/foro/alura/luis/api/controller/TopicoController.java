package foro.alura.luis.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import foro.alura.luis.api.topico.DatosActualizarTopico;
import foro.alura.luis.api.topico.DatosListadoTopico;
import foro.alura.luis.api.topico.DatosRegistroTopico;
import foro.alura.luis.api.topico.DatosRespuestaTopico;
import foro.alura.luis.api.topico.Topico;
import foro.alura.luis.api.topico.TopicoMapper;
import foro.alura.luis.api.topico.TopicoRepository;
import foro.alura.luis.api.topico.TopicoService;

@RestController
@RequestMapping("/topicos")
public class TopicoController {

    @Autowired
    private TopicoRepository topicoRepository;

    private final TopicoService topicoService;
    private final TopicoMapper topicoMapper;

    public TopicoController(TopicoService topicoService, TopicoMapper topicoMapper) {
        this.topicoService = topicoService;
        this.topicoMapper = topicoMapper;
    }

    @PostMapping
    @Transactional
    public void registrarTopico(@RequestBody @Valid DatosRegistroTopico datosRegistroTopico) {
        topicoService.crearTopico(datosRegistroTopico);
    }

    @GetMapping
    public Page<DatosListadoTopico> ListandoTopicos(Pageable paginacion) {
        return topicoRepository.findByActivoTrue(paginacion).map(topicoMapper::toDatosListadoTopico);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<DatosRespuestaTopico> actualizarTopico(
            @RequestBody @Valid DatosActualizarTopico datosActualizarTopico) {
        Topico topico = topicoRepository.getReferenceById(datosActualizarTopico.id());
        topico.actualizarDatos(datosActualizarTopico);

        DatosRespuestaTopico datosRespuestaTopico = new DatosRespuestaTopico(topico.getId(), topico.getTitulo(),
                topico.getMensaje(), topico.getFecha(), topico.getEstatus(), topico.getTags(),
                topico.getCurso());

        return ResponseEntity.ok(datosRespuestaTopico);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> eliminarTopico(@PathVariable Long id) {
        Topico topico = topicoRepository.getReferenceById(id);
        topico.desactivarTopico();
        return ResponseEntity.noContent().build();
    }

}
