package br.com.desafiospring.backendemjava.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.desafiospring.backendemjava.models.entities.Funcionario;
import br.com.desafiospring.backendemjava.models.repositories.CargoRepository;
import br.com.desafiospring.backendemjava.models.repositories.FuncionarioRepository;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/Funcionario")
public class FuncionarioController {

	@Autowired
	private FuncionarioRepository funcionarioRepository;
	@Autowired
	private CargoRepository cargoRepository;
	
	@GetMapping
	public ResponseEntity<List<Funcionario>> getAllUsers() {
		List<Funcionario> funcionarios = (List<Funcionario>) funcionarioRepository.findAll();
		return new ResponseEntity<List<Funcionario>>(funcionarios, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Funcionario> getUserById(@PathVariable int id){
		try {			
			if(funcionarioRepository.findById(id).isPresent() == false) {
				return new ResponseEntity<Funcionario>(HttpStatus.NOT_FOUND);
			}else {
				Funcionario func = funcionarioRepository.findById(id).get();	
				return new ResponseEntity<Funcionario>(func, HttpStatus.OK);				
			}		
			
		}catch(Exception e) {
			return new ResponseEntity<Funcionario>(HttpStatus.BAD_REQUEST);
		}		
	}
	
	@PostMapping
	public ResponseEntity<Funcionario> addUser(@RequestBody Funcionario funcionario){
		try {
			funcionario.setCargo(cargoRepository.findById(funcionario.getCargo().getId()).get());
			funcionarioRepository.save(funcionario);
			return new ResponseEntity<Funcionario>(funcionario, HttpStatus.CREATED);
			
		}catch(Exception ex) {
			return new ResponseEntity<Funcionario>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Funcionario> editUser(@RequestBody Funcionario funcionario, @PathVariable int id){
		try {
			if(funcionarioRepository.findById(id).isPresent()) {
				Funcionario oldFunc = funcionarioRepository.findById(id).get();
				oldFunc.setNome(funcionario.getNome());
				oldFunc.setIdade(funcionario.getIdade());
				oldFunc.setCargo(cargoRepository.findById(funcionario.getCargo().getId()).get());
				funcionarioRepository.save(oldFunc);
				return new ResponseEntity<Funcionario>(oldFunc, HttpStatus.ACCEPTED);
			}else {
				return new ResponseEntity<Funcionario>(HttpStatus.NOT_FOUND);
			}
		}catch(Exception e) {
			return new ResponseEntity<Funcionario>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable int id){
		try {
			if(funcionarioRepository.findById(id).isPresent()) {
				Funcionario oldFunc = funcionarioRepository.findById(id).get();
				funcionarioRepository.delete(oldFunc);
				return new ResponseEntity<String>("Funcionário apagado com sucesso", HttpStatus.ACCEPTED);
			}else {
				return new ResponseEntity<String>("Funcionário não encontrado", HttpStatus.NOT_FOUND);
			}
		}catch(Exception e) {
			return new ResponseEntity<String>("Erro ao tentar apagar o funcionário", HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
}
