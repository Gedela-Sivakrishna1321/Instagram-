package com.instagram.Exceptions;

import java.time.LocalDateTime;

public class ErrorDetails {

	private String message;
	private String details;
	private LocalDateTime timestamp;

	public ErrorDetails(String message, String details, LocalDateTime timestamp) {
		super();
		this.message = message;
		this.details = details;
		this.timestamp = timestamp;
	}

	public ErrorDetails() {
		super();
		// TODO Auto-generated constructor stub
	}



}
