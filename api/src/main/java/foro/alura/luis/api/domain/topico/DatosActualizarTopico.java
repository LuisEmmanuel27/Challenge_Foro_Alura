package foro.alura.luis.api.domain.topico;

import jakarta.validation.constraints.NotNull;

public record DatosActualizarTopico(
		@NotNull Long id,
		String titulo,
		String mensaje) {

}
