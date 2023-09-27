# TopicoController:

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

## Explicacion:

-   `@RestController`: Esta anotación marca la clase como un controlador de Spring que maneja las solicitudes HTTP. Indica que los métodos de esta clase serán invocados para procesar solicitudes HTTP entrantes.

-   `@RequestMapping("/topicos")`: Esta anotación a nivel de clase especifica la raíz URL ("/topicos") para todas las solicitudes manejadas por este controlador. En otras palabras, cualquier solicitud que comience con "/topicos" será manejada por los métodos de este controlador.

-   `private final TopicoService topicoService`: Aquí se declara un atributo topicoService que es de tipo TopicoService. Es importante notar que el atributo se declara como final, lo que significa que su valor no puede cambiar después de la inicialización.

-   `public TopicoController(TopicoService topicoService)`: Este es el constructor del controlador. Toma un parámetro de tipo TopicoService, que es una dependencia requerida para que el controlador funcione. No se necesita la anotación @Autowired en este caso, ya que Spring puede realizar la inyección de dependencias automáticamente debido a que hay un único constructor en la clase.

-   `@PostMapping`: Esta anotación marca el método registrarTopico como un manejador de solicitudes HTTP POST. Esto significa que este método se ejecutará cuando se reciba una solicitud HTTP POST en la ruta "/topicos" (que se concatena con la ruta de clase definida previamente).

-   `public void registrarTopico(@RequestBody @Valid DatosRegistroTopico datosRegistroTopico)`: Este método maneja las solicitudes POST para registrar un nuevo tópico. Toma un parámetro datosRegistroTopico, que representa los datos enviados en el cuerpo de la solicitud HTTP. La anotación @RequestBody indica a Spring que debe deserializar automáticamente los datos JSON del cuerpo de la solicitud en un objeto de tipo DatosRegistroTopico.

-   `topicoService.crearTopico(datosRegistroTopico)`: Finalmente, el método invoca un método del servicio (crearTopico) pasando los datos del tópico a registrar. El servicio se encargará de procesar la lógica de negocio y crear el tópico correspondiente en la base de datos.

# TopicoRepository.java:

Codigo:

    @Service
    public class TopicoService {

        private final TopicoRepository topicoRepository;
        private final UsuarioRepository usuarioRepository;

        // Constructor de la clase
        public TopicoService(TopicoRepository topicoRepository, UsuarioRepository usuarioRepository) {
            this.topicoRepository = topicoRepository;
            this.usuarioRepository = usuarioRepository;
        }

        // Método para crear un nuevo tópico
        public void crearTopico(DatosRegistroTopico datosRegistroTopico) {
            // Paso 1: Cargar el usuario desde el repositorio
            Usuario usuario = usuarioRepository.findById(datosRegistroTopico.idUsuario())
                    .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

            // Paso 2: Crear un objeto Topico y asignarle el usuario
            Topico topico = new Topico(datosRegistroTopico);
            topico.setUsuario(usuario);

            // Paso 3: Guardar el tópico en el repositorio
            topicoRepository.save(topico);
        }
    }

## Explicación:

1. `@Service`: Anotación que marca la clase como un servicio gestionado por Spring.

2. Declaración de dos atributos finales de la clase topicoRepository y usuarioRepository. Estos atributos representan los repositorios utilizados para interactuar con la base de datos.

3. Constructor de la clase TopicoService. Toma como argumentos los repositorios topicoRepository y usuarioRepository y los asigna a los atributos de la clase.

4. Método crearTopico que se utiliza para crear un nuevo tópico a partir de los datos proporcionados en el objeto DatosRegistroTopico.

5. `Paso 1`: Se utiliza el repositorio de usuarios (usuarioRepository) para cargar el usuario correspondiente a partir del ID proporcionado (datosRegistroTopico.idUsuario()). Si el usuario no se encuentra en la base de datos, se lanza una excepción.

6. `Paso 2`: Se crea un objeto Topico utilizando los datos proporcionados en datosRegistroTopico.

7. `Asignar el Usuario`: Se asigna el usuario cargado en el Paso 1 al tópico que se está creando utilizando topico.setUsuario(usuario).

8. `Paso 3`: El tópico creado se guarda en la base de datos utilizando el repositorio de tópicos (topicoRepository) mediante topicoRepository.save(topico).

En resumen, este código representa un servicio (TopicoService) que se encarga de crear nuevos tópicos asegurándose de que el usuario exista en la base de datos y asignándolo al tópico antes de guardarlo en la base de datos.

## Extras:

El uso de `final` en los atributos de la clase y la ausencia de @Autowired en el constructor son elecciones de diseño que siguen buenas prácticas en Spring. Veamos por qué se utiliza final y por qué no se necesita `@Autowired` en este contexto:

1. Uso de `final` en los atributos:

    - La declaración de los atributos como final hace que sean inmutables una vez que se les asigna un valor. Esto es una buena práctica para asegurarse de que los atributos no cambien después de la inicialización, lo que puede ayudar a prevenir errores sutiles en el código.

    - Además, el uso de final es compatible con el principio de "inversión de dependencia" de la Programación Orientada a Objetos (OOP). En lugar de depender de una implementación específica, la clase TopicoService depende de una abstracción (TopicoRepository y UsuarioRepository), lo que facilita la inyección de dependencias y las pruebas unitarias.

2. Constructor sin `@Autowired`:

    - En las versiones más recientes de Spring (a partir de Spring Framework 4.3), no es necesario usar @Autowired en el constructor si la clase tiene un único constructor. Spring lo detectará automáticamente y realizará la inyección de dependencias.

    - En el código proporcionado, la clase TopicoService tiene un único constructor que toma los repositorios como argumentos. Spring es capaz de detectar automáticamente este constructor y realizar la inyección de dependencias sin necesidad de la anotación @Autowired. Esto simplifica el código y lo hace más limpio.

# DatosRegistroTopico.java:

    package foro.alura.luis.api.topico;

    import java.time.LocalDateTime;

    import com.fasterxml.jackson.annotation.JsonProperty;

    import jakarta.validation.constraints.NotBlank;
    import jakarta.validation.constraints.NotNull;

    public record DatosRegistroTopico(
            @NotBlank String titulo,
            @NotBlank String mensaje,
            @NotNull LocalDateTime fecha,
            @NotNull Boolean estatus,
            @NotBlank String tags,
            @NotBlank String curso,
            @NotNull @JsonProperty("id_usuario") Long idUsuario

    ) {

    }

## Explicación del @JsonProperty:

En Java, `JsonProperty` es una anotación que se utiliza para especificar el nombre de una propiedad en un objeto `JSON` cuando se serializa o deserializa un objeto Java utilizando la biblioteca Jackson.

En el caso del código proporcionado, la anotación `JsonProperty` se utiliza en el atributo `idUsuario` de la clase DatosRegistroTopico. El nombre de la propiedad en el objeto `JSON` será id_usuario, en lugar de `idUsuario`.

Esto se debe a que el nombre de la propiedad `idUsuario` no cumple con las convenciones de nomenclatura de `JSON`. Las propiedades de `JSON` deben comenzar con una letra minúscula, y no deben contener guiones bajos.

Al utilizar la anotación `JsonProperty`, se garantiza que el nombre de la propiedad en el objeto `JSON` sea válido.

En el código proporcionado, el método crearTopico() de la clase TopicoService utiliza el atributo `idUsuario` para cargar el usuario que creó el tópico.

Sin la anotación `JsonProperty`, el nombre de la propiedad en el objeto `JSON` sería `idUsuario`, lo que podría provocar un error al intentar cargar el usuario.

Por lo tanto, la anotación `JsonProperty` es necesaria en este caso para garantizar que el nombre de la propiedad en el objeto `JSON` sea válido y que el método crearTopico() pueda cargar correctamente el usuario que creó el tópico.
