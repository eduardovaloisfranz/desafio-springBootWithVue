package br.com.desafiospring.backendemjava.models.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.desafiospring.backendemjava.models.entities.Funcionario;

@Repository
public interface FuncionarioRepository extends CrudRepository<Funcionario, Integer>{
	@Override
    List<Funcionario> findAll();
}
