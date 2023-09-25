package foro.alura.luis.api.usuario;

import java.util.List;

import foro.alura.luis.api.topico.Topico;

public record DatosRegistroUsuario(
        String nombre,
        String correo,
        String contraseña,
        String foto,
        List<Topico> topicos) {

}
