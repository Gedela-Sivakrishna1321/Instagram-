package com.instagram.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.instagram.Exceptions.UserException;
import com.instagram.Models.User;
import com.instagram.Repository.UserRepository;
import com.instagram.Service.UserService;

@RestController
public class AuthController {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/signup")
	public ResponseEntity<User> registerUserHandler(@RequestBody User user) throws UserException {

		User user2 = userService.registerUser(user);
		return new ResponseEntity<>(user2, HttpStatus.CREATED);
	}

	
	@CrossOrigin
	@GetMapping("/signin")
	public ResponseEntity<User> signInHandler(Authentication auth ) throws BadCredentialsException {
		
		Optional<User> userOptional = userRepository.findByEmail(auth.getName());
		
		if(userOptional.isPresent()) {
			return new ResponseEntity<User>(userOptional.get(), HttpStatus.ACCEPTED);
		}
		
		throw new BadCredentialsException("Invalid username or password !");
	}
	
}
