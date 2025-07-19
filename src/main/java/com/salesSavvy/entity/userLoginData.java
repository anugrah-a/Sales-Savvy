package com.salesSavvy.entity;


public class userLoginData {
	String username;
	String password;
	public userLoginData() {
		super();
		// TODO Auto-generated constructor stub
	}
	public userLoginData(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "userLoginData [username=" + username + ", password=" + password + "]";
	}
	
	
}
