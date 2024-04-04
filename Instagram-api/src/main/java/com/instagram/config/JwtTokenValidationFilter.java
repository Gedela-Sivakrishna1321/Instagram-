package com.instagram.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidationFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String jwt = request.getHeader(SecurityContext.HEADER);
		
		//System.out.println("JWT TOKEN WITH BEARER : "+ jwt);
		
		if(jwt != null ) {
			try {
				
				jwt = jwt.substring(7);
			//	System.out.println("JWT TOKEN : "+ jwt);
				
				SecretKey key = Keys.hmacShaKeyFor(SecurityContext.JWT_KEY.getBytes());
			//	System.out.println("KEY : "+key);
				
				Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
			//	System.out.println("CLAIMS : "+claims);
				
				String username = String.valueOf(claims.get("username"));
			//	System.out.println("USERNAME : " + username);
				
				String authorities = (String) claims.get("authorities");
			//	System.out.println("AUTHORITIES : "+authorities);
				
				List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
				
				Authentication auth = new UsernamePasswordAuthenticationToken(username,  null, auths);
			//	System.out.println("AUTHENTICATION OBJECT : "+ auth);
				
				SecurityContextHolder.getContext().setAuthentication(auth);
			//	System.out.println("Successfully set the auth object to security context holder : )" );
				
			} catch (Exception e) {
				throw new BadCredentialsException("Invalid token !");
			}
		}
		
		filterChain.doFilter(request, response);
	}
	
	protected boolean  shouldNotFilter( HttpServletRequest request) throws ServletException {
		return request.getServletPath().equals("/signin");
	}

	
}
