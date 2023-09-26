package foro.alura.luis.api.controller;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import foro.alura.luis.api.topico.DatosRegistroTopico;
import foro.alura.luis.api.topico.TopicoService;

@RestController
@RequestMapping("/topicos")
public class TopicoController {

    private final TopicoService topicoService;

    public TopicoController(TopicoService topicoService) {
        this.topicoService = topicoService;
    }

    @PostMapping
    public void registrarTopico(@RequestBody @Valid DatosRegistroTopico datosRegistroTopico) {
        topicoService.crearTopico(datosRegistroTopico);
    }

}
