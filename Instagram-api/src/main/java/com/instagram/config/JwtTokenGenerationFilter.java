package com.instagram.config;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenGenerationFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// check 2
		System.out.println("Getting started to generate Token ...");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		// check 3
		System.out.println(authentication);
		
		if(authentication != null) {
			
			SecretKey key = Keys.hmacShaKeyFor(SecurityContext.JWT_KEY.getBytes());
			
			
			String jwt = Jwts.builder()
					         .setIssuer("Instagram")
					         .setIssuedAt(new Date())
					         .claim("authorities", populateAuthorities(authentication.getAuthorities()))
					         .claim("username", authentication.getName())
					         .setExpiration(new Date(new Date().getTime() + 300000000))
					         .signWith(key).compact();
			// check 4
			System.out.println("Token : "+jwt);
			response.setHeader(SecurityContext.HEADER, jwt);
			// check 5
			System.out.println(response.getHeader("Authorization"));
		}
		filterChain.doFilter(request, response);
	}
	
	public String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
		
		Set<String> authorities = new HashSet<>();
		
		for(GrantedAuthority authority : collection) {
			authorities.add(authority.getAuthority());
		}
		
		return String.join(",", authorities);
	}
	
	protected  boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		return !request.getServletPath().equals("/signin");
	}
}
