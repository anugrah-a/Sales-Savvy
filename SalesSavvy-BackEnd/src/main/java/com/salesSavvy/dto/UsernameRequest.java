package com.salesSavvy.dto;

import jakarta.validation.constraints.NotBlank;

public class UsernameRequest {
	@NotBlank(message = "Username required")
	private String username;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public UsernameRequest(String username) {
		super();
		this.username = username;
	}

	public UsernameRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
