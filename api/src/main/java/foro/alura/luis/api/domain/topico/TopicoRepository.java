package foro.alura.luis.api.domain.topico;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicoRepository extends JpaRepository<Topico, Long> {

    Page<Topico> findByActivoTrue(Pageable paginacion);

    Page<Topico> findByTagsAndCursoAndActivoTrue(Tags tags, Cursos curso, Pageable pageable);

    Page<Topico> findByTagsAndActivoTrue(Tags tags, Pageable pageable);

    Page<Topico> findByCursoAndActivoTrue(Cursos curso, Pageable pageable);

}
