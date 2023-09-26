package foro.alura.luis.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import foro.alura.luis.api.topico.Topico;
import foro.alura.luis.api.topico.DatosRegistroTopico;
import foro.alura.luis.api.topico.TopicoRepository;

@RestController
@RequestMapping("/topicos")
public class TopicoController {

    @Autowired
    private TopicoRepository topicoRepository;

    @PostMapping
    public void registrarTopico(@RequestBody @Valid DatosRegistroTopico datosRegistroTopico) {
        topicoRepository.save(new Topico(datosRegistroTopico));
    }

}
