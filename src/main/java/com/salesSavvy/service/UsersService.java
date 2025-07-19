package com.salesSavvy.service;

import com.salesSavvy.entity.Product;
import com.salesSavvy.entity.Users;

public interface UsersService {
	void signUp(Users user);
	Users getUser(String username);
	public boolean validate(String username, String password);
	void updateUser(Users user);
	void addUser(Users user);
	void deleteUser(String username);
	
}
