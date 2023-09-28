package foro.alura.luis.api.topico;

import java.time.LocalDateTime;

import foro.alura.luis.api.usuario.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "topicos")
@Entity(name = "Topico")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Topico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String mensaje;
    private LocalDateTime fecha;
    private Boolean estatus;
    private Boolean activo;

    @Enumerated(EnumType.STRING)
    private Tags tags;

    @Enumerated(EnumType.STRING)
    private Cursos curso;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    public Topico(DatosRegistroTopico datosRegistroTopico) {
        this.activo = true;
        this.titulo = datosRegistroTopico.titulo();
        this.mensaje = datosRegistroTopico.mensaje();
        this.fecha = datosRegistroTopico.fecha();
        this.estatus = datosRegistroTopico.estatus();
        this.tags = datosRegistroTopico.tags();
        this.curso = datosRegistroTopico.curso();
    }

    public void actualizarDatos(DatosActualizarTopico datosActualizarTopico) {
        if (datosActualizarTopico.titulo() != null) {
            this.titulo = datosActualizarTopico.titulo();
        }

        if (datosActualizarTopico.mensaje() != null) {
            this.mensaje = datosActualizarTopico.mensaje();
        }
    }

    public void desactivarTopico() {
        this.activo = false;
    }

}
