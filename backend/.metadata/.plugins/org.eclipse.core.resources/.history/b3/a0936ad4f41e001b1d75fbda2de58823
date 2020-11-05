package br.com.desafiospring.backendemjava.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.desafiospring.backendemjava.models.entities.Cargo;
import br.com.desafiospring.backendemjava.models.repositories.CargoRepository;

@CrossOrigin()
@RestController
@RequestMapping("/api/Cargo")
public class CargoController {
	
	@Autowired
	private CargoRepository _ctx;
	
	@GetMapping
	public ResponseEntity<List<Cargo>> getAllCargos(){
		List<Cargo> cargos = (List<Cargo>) _ctx.findAll();		
		return new ResponseEntity<List<Cargo>>(cargos, HttpStatus.OK);		
	}
	
	@PostMapping()
	public ResponseEntity<Cargo> addCargo(@RequestBody Cargo cargo){
		try {
			_ctx.save(cargo);
			return new ResponseEntity<Cargo>(cargo, HttpStatus.OK);
			
		}catch(Exception e) {
			return new ResponseEntity<Cargo>(HttpStatus.BAD_REQUEST);
		}
	}
}
