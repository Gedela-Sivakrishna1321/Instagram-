package com.instagram.security;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.instagram.config.SecurityContext;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtTokenProvider  {
	
	public JwtTokenClaims getJwtClaimsFromToken(String token) {
		
		SecretKey key = Keys.hmacShaKeyFor(SecurityContext.JWT_KEY.getBytes());
		
		Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
		
		String email = String.valueOf(claims.get("username"));
		
		JwtTokenClaims jwtTokenClaims = new JwtTokenClaims();
		jwtTokenClaims.setEmail(email);
		
		return jwtTokenClaims;
	}

}
