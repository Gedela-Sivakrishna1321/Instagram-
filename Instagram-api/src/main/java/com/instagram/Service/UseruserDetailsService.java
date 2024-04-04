package com.instagram.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.instagram.Repository.UserRepository;

@Service
public class UseruserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<com.instagram.Models.User> userOptional = userRepository.findByEmail(username);
		
		if(userOptional.isPresent() ) {
			
			com.instagram.Models.User user = userOptional.get();
			
			List<GrantedAuthority> authorities = new ArrayList<>();
			
			return new User(user.getEmail(), user.getPassword(), authorities);
		}
		
		throw new BadCredentialsException("user not found with username : "+ username);
	}

}
