package foro.alura.luis.api.domain.usuario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "usuarios")
@Entity(name = "Usuario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;
    private String correo;
    private String password;
    private String foto;

    public Usuario(DatosRegistroUsuario datosRegistroUsuario) {
        this.login = datosRegistroUsuario.login();
        this.correo = datosRegistroUsuario.correo();
        this.password = datosRegistroUsuario.password();
        this.foto = datosRegistroUsuario.foto();
    }
}
