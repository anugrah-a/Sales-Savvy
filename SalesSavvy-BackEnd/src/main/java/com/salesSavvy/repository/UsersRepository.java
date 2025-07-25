package com.salesSavvy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salesSavvy.entity.Users;

public interface UsersRepository extends JpaRepository<Users, Long>{
	Users findByUsernameIgnoreCase(String username);
	
	void deleteByUsernameIgnoreCase(String username);
	
	
}
