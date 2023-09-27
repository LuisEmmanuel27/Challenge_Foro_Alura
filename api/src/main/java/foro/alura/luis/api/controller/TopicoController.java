package foro.alura.luis.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import foro.alura.luis.api.topico.DatosListadoTopico;
import foro.alura.luis.api.topico.DatosRegistroTopico;
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
    public void registrarTopico(@RequestBody @Valid DatosRegistroTopico datosRegistroTopico) {
        topicoService.crearTopico(datosRegistroTopico);
    }

    @GetMapping
    public Page<DatosListadoTopico> ListandoTopicos(Pageable paginacion) {
        return topicoRepository.findAll(paginacion).map(topicoMapper::toDatosListadoTopico);
    }

}
