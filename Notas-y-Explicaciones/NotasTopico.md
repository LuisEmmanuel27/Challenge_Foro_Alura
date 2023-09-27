# Topico.java:

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

        @Enumerated(EnumType.STRING)
        private Tags tags;

        @Enumerated(EnumType.STRING)
        private Cursos curso;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "id_usuario")
        private Usuario usuario;

        public Topico(DatosRegistroTopico datosRegistroTopico) {
            this.titulo = datosRegistroTopico.titulo();
            this.mensaje = datosRegistroTopico.mensaje();
            this.fecha = datosRegistroTopico.fecha();
            this.estatus = datosRegistroTopico.estatus();
            this.tags = datosRegistroTopico.tags();
            this.curso = datosRegistroTopico.curso();
        }

    }

## Explicación:

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

La elección entre `EAGER` y `LAZY` en la asociación @ManyToOne entre la entidad Topico y Usuario está relacionada con la estrategia de carga de datos en una relación entre entidades en JPA (Java Persistence API).

En este caso, se utilizó `EAGER`, lo que significa que cuando se recupera un objeto Topico de la base de datos, JPA también recupera automáticamente el objeto Usuario relacionado en la misma consulta. Esto se hace para asegurarse de que siempre tengas acceso al objeto Usuario asociado sin necesidad de cargarlo explícitamente. En otras palabras, la carga `EAGER` garantiza que el objeto relacionado esté disponible en el momento en que se accede al objeto Topico.

A continuación, se explican algunas de las razones por las cuales se podría elegir `EAGER` en lugar de `LAZY` en esta asociación:

1. `Simplicidad y comodidad`: La carga `EAGER` es más simple de usar y puede ser más conveniente en ciertos casos, especialmente cuando sabes que siempre necesitas acceder al objeto relacionado. Esto evita tener que escribir código adicional para cargar explícitamente el objeto relacionado (como con `LAZY`).

2. `Evitar excepciones de LazyInitializationException`: Con `EAGER`, no te encontrarás con excepciones `LazyInitializationException` cuando intentes acceder a propiedades del objeto Usuario después de que la sesión de JPA se haya cerrado. En cambio, la carga se realiza en el momento de la consulta original.

3. `Rendimiento en ciertos escenarios`: Siempre que necesites el objeto relacionado, `EAGER` puede ser más eficiente en términos de rendimiento, ya que realiza una única consulta para recuperar tanto el objeto Topico como el Usuario relacionado.

Sin embargo, es importante tener en cuenta que el uso de `EAGER` puede tener implicaciones en el rendimiento de la aplicación, especialmente si la relación entre las entidades es muy grande o si solo necesitas el objeto relacionado en un subconjunto de casos de uso. En tales situaciones, `LAZY` sería una opción más eficiente, ya que solo cargaría el objeto relacionado cuando sea necesario, reduciendo la sobrecarga de consultas innecesarias.

## ¿Ayuda la implementación de Page en TopicoController?

El uso de la paginación a través de `Page` en la consulta `GET` puede ayudar a mitigar los problemas de rendimiento relacionados con la estrategia de carga `EAGER` en la asociación `@ManyToOne`. Si bien `EAGER` carga los datos relacionados de manera anticipada y puede aumentar la sobrecarga de la consulta en casos normales, al usar la paginación, limitas la cantidad de datos recuperados en cada consulta, lo que puede ayudar a mantener el rendimiento bajo control.

Aquí hay algunas consideraciones:

1. `Carga por demanda`: Con la paginación, solo se recuperan un número limitado de registros (por ejemplo, 20) en cada consulta. Esto significa que, aunque uses `EAGER`, solo cargará los objetos Usuario relacionados para ese subconjunto específico de Topico. Esto reduce la sobrecarga de la consulta en comparación con cargar todos los objetos relacionados de una sola vez.

2. `Carga perezosa interna`: Al utilizar paginación, el framework de persistencia (como Hibernate en el caso de Spring Data JPA) puede realizar una especie de "carga perezosa interna" para las relaciones `EAGER`. Esto significa que solo cargarán efectivamente los objetos Usuario cuando se acceda a ellos en el código, en lugar de cargarlos todos de inmediato.

3. `Optimización de consultas`: El framework de persistencia puede intentar optimizar las consultas al usar `EAGER`. Por ejemplo, si tienes una consulta paginada que obtiene 20 Topicos, el framework podría intentar ejecutar una consulta SQL que recupere solo los IDs de los Usuario relacionados y luego cargar los objetos Usuario de manera selectiva cuando sea necesario.

# TopicoController.java:

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

## Explicacion hasta el PostMapping:

-   `@RestController`: Esta anotación marca la clase como un controlador de Spring que maneja las solicitudes HTTP. Indica que los métodos de esta clase serán invocados para procesar solicitudes HTTP entrantes.

-   `@RequestMapping("/topicos")`: Esta anotación a nivel de clase especifica la raíz URL ("/topicos") para todas las solicitudes manejadas por este controlador. En otras palabras, cualquier solicitud que comience con "/topicos" será manejada por los métodos de este controlador.

-   `private final TopicoService topicoService`: Aquí se declara un atributo topicoService que es de tipo TopicoService. Es importante notar que el atributo se declara como final, lo que significa que su valor no puede cambiar después de la inicialización.

-   `public TopicoController(TopicoService topicoService)`: Este es el constructor del controlador. Toma un parámetro de tipo TopicoService, que es una dependencia requerida para que el controlador funcione. No se necesita la anotación @Autowired en este caso, ya que Spring puede realizar la inyección de dependencias automáticamente debido a que hay un único constructor en la clase.

-   `@PostMapping`: Esta anotación marca el método registrarTopico como un manejador de solicitudes HTTP POST. Esto significa que este método se ejecutará cuando se reciba una solicitud HTTP POST en la ruta "/topicos" (que se concatena con la ruta de clase definida previamente).

-   `public void registrarTopico(@RequestBody @Valid DatosRegistroTopico datosRegistroTopico)`: Este método maneja las solicitudes POST para registrar un nuevo tópico. Toma un parámetro datosRegistroTopico, que representa los datos enviados en el cuerpo de la solicitud HTTP. La anotación @RequestBody indica a Spring que debe deserializar automáticamente los datos JSON del cuerpo de la solicitud en un objeto de tipo DatosRegistroTopico.

-   `topicoService.crearTopico(datosRegistroTopico)`: Finalmente, el método invoca un método del servicio (crearTopico) pasando los datos del tópico a registrar. El servicio se encargará de procesar la lógica de negocio y crear el tópico correspondiente en la base de datos.

## Explicación del GetMapping:

1. `@GetMapping`: Esta anotación de Spring Boot indica que este método responderá a las solicitudes HTTP GET en la ruta /topicos. Cuando un usuario accede a esta ruta a través de un navegador web o una solicitud HTTP GET, se ejecutará este método.

2. `public Page<DatosListadoTopico> ListandoTopicos(Pageable paginacion)`: Este es el método que manejará las solicitudes GET a la ruta /topicos. Explicaré cada parte de esta línea:

    - `Page<DatosListadoTopico>`: Este método devuelve un objeto Page que contiene una lista de objetos DatosListadoTopico. Un Page es una interfaz de Spring Data que representa una página de resultados, lo que permite la paginación de los resultados.

    - `Pageable paginacion`: Este parámetro se usa para configurar y controlar la paginación de los resultados. Spring Boot lo inyecta automáticamente según la solicitud. Pageable es una interfaz que permite configurar la paginación, como el número de página, el tamaño de la página, etc.

3. `return topicoRepository.findAll(paginacion).map(topicoMapper::toDatosListadoTopico);`: Esta línea es la parte principal del método ListandoTopicos y tiene varios componentes:

    - `topicoRepository:` Es una instancia de la interfaz TopicoRepository, que se utiliza para acceder a los datos relacionados con los tópicos en la base de datos.

    - `findAll(paginacion)` llama a un método que recupera todos los registros de tópicos de la base de datos paginados según la configuración proporcionada en el objeto Pageable.

    - `map(topicoMapper::toDatosListadoTopico)`: Después de recuperar los tópicos, los mapea a un objeto DatosListadoTopico utilizando la función map. Esto significa que estás transformando los objetos Topico en objetos DatosListadoTopico utilizando el topicoMapper. El topicoMapper se encarga de esta transformación. El resultado final es una página de objetos DatosListadoTopico que se devuelve como respuesta a la solicitud GET.

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

### Nota: Elimine el JsonProperty por lo que dejare las notas como informacion extra.

# TopicoMapper.java:

    package foro.alura.luis.api.topico;

    import java.time.format.DateTimeFormatter;

    import org.springframework.stereotype.Component;

    import foro.alura.luis.api.usuario.DatosListadoUsuario;

    @Component
    public class TopicoMapper {

        private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

        public DatosListadoTopico toDatosListadoTopico(Topico topico) {
            DatosListadoUsuario DatosUsuario = new DatosListadoUsuario(
                    topico.getUsuario().getNombre(),
                    topico.getUsuario().getCorreo(),
                    topico.getUsuario().getFoto());

            String formattedFecha = topico.getFecha().format(formatter);

            return new DatosListadoTopico(
                    topico.getTitulo(),
                    topico.getMensaje(),
                    formattedFecha,
                    topico.getEstatus(),
                    topico.getTags().toString(),
                    topico.getCurso().toString(),
                    DatosUsuario);
        }

    }

## Explicación:

1. `import java.time.format.DateTimeFormatter`: Importa la clase DateTimeFormatter del paquete java.time.format. Esta clase se utiliza para formatear fechas y horas.

2. `import org.springframework.stereotype.Component`: Importa la anotación @Component de Spring, que se utiliza para indicar que esta clase debe ser gestionada por el contenedor de Spring como un componente.

3. `private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");`: Crea una instancia de DateTimeFormatter llamada formatter que se utilizará para formatear las fechas y horas en un formato específico.

4. `public DatosListadoTopico toDatosListadoTopico(Topico topico)`: Este es el método principal de la clase TopicoMapper. Explicaré cada parte de esta línea:

    - `DatosListadoTopico`: Este método devuelve un objeto DatosListadoTopico.

    - `toDatosListadoTopico`: Nombre del método.

    - `(Topico topico)`: Este método acepta un parámetro topico de tipo Topico. Este parámetro representa un objeto de tipo Topico que se utilizará para crear un objeto DatosListadoTopico.

5. `DatosListadoUsuario DatosUsuario = new DatosListadoUsuario(...)`: En esta línea se crea un objeto DatosListadoUsuario que contiene información del usuario asociado al tópico. Se obtienen el nombre, el correo y la foto del usuario desde el objeto topico.

6. `String formattedFecha = topico.getFecha().format(formatter);`: Se formatea la fecha del tópico utilizando el formatter definido anteriormente. Esto convierte la fecha en una cadena de texto en el formato deseado.

7. `return new DatosListadoTopico(...)`: En esta línea se crea y se devuelve un nuevo objeto DatosListadoTopico. Se utilizan los datos del objeto topico y los valores calculados en pasos anteriores (como formattedFecha) para inicializar un objeto DatosListadoTopico que luego se devuelve como resultado.

## Explicación general:

La clase TopicoMapper tiene el propósito de actuar como un componente encargado de realizar la transformación de objetos de la entidad Topico a objetos de la clase DatosListadoTopico. Su existencia y funcionalidad se justifican por varias razones importantes:

1. `Separación de preocupaciones (SoC)`: Uno de los principios fundamentales de diseño de software es la separación de preocupaciones, que implica dividir el código en componentes que se ocupen de tareas específicas. TopicoMapper se encarga de la tarea específica de mapear (transformar) objetos Topico en objetos DatosListadoTopico. Esta separación permite que el código sea más modular y fácil de mantener, ya que cada componente tiene una responsabilidad claramente definida.

2. `Reutilización de código`: Al encapsular la lógica de mapeo en una clase dedicada, como TopicoMapper, se facilita la reutilización de esta lógica en diferentes partes de la aplicación si es necesario. En lugar de duplicar el código de mapeo en varios lugares, se puede usar el TopicoMapper en cualquier parte donde sea necesario realizar esta conversión.

3. `Abstracción de la representación de datos`: La clase DatosListadoTopico representa una estructura de datos específica para mostrar información de tópicos en una lista. Al usar TopicoMapper, se abstracta la representación interna de un tópico de su representación en una lista. Esto facilita los cambios en la representación de datos sin afectar directamente a la entidad Topico.

4. `Evitar código repetitivo y propenso a errores`: La transformación manual de objetos Topico en objetos DatosListadoTopico podría llevar a código repetitivo y propenso a errores. TopicoMapper encapsula esta lógica, lo que reduce la posibilidad de errores y facilita las actualizaciones futuras en la lógica de mapeo.

5. `Facilita el testing`: Al tener una clase separada para la lógica de mapeo, es más fácil escribir pruebas unitarias específicas para esta funcionalidad. Esto mejora la calidad del código y permite una mejor cobertura de pruebas.
