package foro.alura.luis.api.domain.respuesta;

import java.time.LocalDateTime;

import foro.alura.luis.api.domain.usuario.Usuario;
import foro.alura.luis.api.domain.topico.Topico;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "respuestas")
@Entity(name = "Respuesta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Respuesta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    String mensaje;
    private LocalDateTime fecha;
    private Boolean activo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_topico")
    private Topico topico;

    public Respuesta(DatosRegistroRespuesta datosRegistroRespuesta) {
        this.activo = true;
        this.mensaje = datosRegistroRespuesta.mensaje();
        this.fecha = datosRegistroRespuesta.fecha();
    }

    public void desactivarRespuesta() {
        this.activo = false;
    }

}
