package com.salesSavvy.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.salesSavvy.dto.UserUpdate;
import com.salesSavvy.entity.Users;
import com.salesSavvy.repository.UsersRepository;

import jakarta.transaction.Transactional;

@Service
public class UsersServiceImplementation implements UsersService{


	@Autowired
	UsersRepository repo;
	
	
	public void signUp(Users user) {
		repo.save(user);
	}
	public Users getUser(String username) {
		//System.out.println(repo.findByUsernameIgnoreCase(username));
		return repo.findByUsernameIgnoreCase(username);
	}
	
	@Override
	public boolean validate(String username, String password) {
		// TODO Auto-generated method stub
		Users user = getUser(username);
		String dbPassword = user.getPassword();
		
		return dbPassword.equals(password);
		
	}
	@Override
	public void updateUser(Users user) {
		// TODO Auto-generated method stub
		
		repo.save(user);
	}
	@Override
	public void addUser(Users user) {
		// TODO Auto-generated method stub
		repo.save(user);
		
	}
	@Override
	@Transactional
	public void deleteUser(String username) {
		// TODO Auto-generated method stub
		repo.deleteByUsernameIgnoreCase(username.trim());
		
	}
	
}
