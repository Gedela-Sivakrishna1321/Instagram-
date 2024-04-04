package com.instagram.config;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import io.jsonwebtoken.lang.Arrays;

@Configuration
@EnableWebSecurity
public class AppConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		http.cors(Customizer.withDefaults())
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) )
		    .csrf(csrf -> csrf.disable() )
		    .authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.POST, "/signup").permitAll()
		    		                           .anyRequest()
		    		                           .authenticated())
		    .addFilterAfter(new JwtTokenGenerationFilter(), BasicAuthenticationFilter.class)
		    .addFilterBefore(new JwtTokenValidationFilter(), BasicAuthenticationFilter.class)
		    .httpBasic(Customizer.withDefaults())
		    .formLogin(Customizer.withDefaults());
		
		return http.build();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		// check 1
//		System.out.println("Inside Password Encoder..");
		return new BCryptPasswordEncoder();
	}
	
	
	
	
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		ArrayList<String> list = new ArrayList<>();
		list.add("Authorization");
	    CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
	    configuration.setAllowedMethods(java.util.Arrays.asList("*"));
	    configuration.setAllowedHeaders(java.util.Arrays.asList("*"));
	    configuration.setAllowCredentials(true);
	    configuration.setExposedHeaders(list);
	    org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    return source;
	}
	
	
}
