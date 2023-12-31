package foro.alura.luis.api.domain.respuesta;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RespuestaRepository extends JpaRepository<Respuesta, Long> {

    Page<Respuesta> findByActivoTrue(Pageable paginacion);

    List<Respuesta> findByTopicoIdAndActivoTrue(Long topicoId);

}
