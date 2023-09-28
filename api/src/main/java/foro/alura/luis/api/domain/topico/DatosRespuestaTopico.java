package foro.alura.luis.api.domain.topico;

import java.time.LocalDateTime;

public record DatosRespuestaTopico(
		Long id,
		String titulo,
		String mensaje,
		LocalDateTime fecha,
		Boolean estatus,
		Tags tags,
		Cursos curso) {

}
