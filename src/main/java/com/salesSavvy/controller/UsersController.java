package com.salesSavvy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.salesSavvy.dto.UserUpdate;
import com.salesSavvy.dto.UsernameRequest;
import com.salesSavvy.entity.Users;
import com.salesSavvy.entity.userLoginData;
import com.salesSavvy.service.ProductService;
import com.salesSavvy.service.UsersService;


@CrossOrigin("*")
@RestController
@RequestMapping("/users")
public class UsersController {

 
	@Autowired
	UsersService usersService;
	@Autowired
	ProductService productService;

	@PostMapping("/signUp")
	public String signUp(@RequestBody Users user) {
		
		String msg ="";
		String username = user.getUsername();
		Users u = usersService.getUser(username);
		if(u == null) {
			usersService.signUp(user);
			msg = "User created successfully";
		}
		else {
			msg = "Username already exist";
		}
		return msg;
	}
	
	
	@PostMapping("/signIn")
	public String signIn(@RequestBody userLoginData user) {
		//TODO: process POST request
		String msg = "";
		String username = user.getUsername();
		String password = user.getPassword();
		Users u = usersService.getUser(username);
		if(u == null) {
			msg = "User does not exixt";
		}
		else {
			boolean status = usersService.validate(username, password);
			if(status == true) {
				if(u.getRole().equals("admin"))
					msg = "admin";
				else {
					msg = "customer";
				}


			}
			else
				msg = "wrong password";
		}
		return msg;
	}

	@GetMapping("/data")
	public String data() {
		
		
		System.out.println("Request Recieved");
		
		return "Request recieved";
	}
	
	@PostMapping("/manage/addUser")
	public ResponseEntity<?> addUser(@RequestBody Users user) {
		//TODO: process POST request
		if(user.getUsername() == null || user.getUsername().isEmpty()) {
			return ResponseEntity.badRequest().body("Username required");
		}
		usersService.addUser(user);
		return ResponseEntity.ok("user added");
	}
	@DeleteMapping("/manage/deleteUser")
	public ResponseEntity<?> deleteUser(@RequestBody UsernameRequest request) {
		//TODO: process POST request
		//System.out.println(request.getUsername());
		String username = request.getUsername().trim();
		Users user = usersService.getUser(username);
		//System.out.println(user);
		if(user == null || user.getUsername().isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		try {
			usersService.deleteUser(username);
			
		}
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body("Caught error");
		}
		return ResponseEntity.ok("User deleted");
	}
	
	@GetMapping("/manage/searchUser")
	public ResponseEntity<?> searchUser(@RequestParam String username ) {
		Users user = null;
		try {
			user = usersService.getUser(username);
			if(user == null || user.getUsername().isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return ResponseEntity.ok(user);
	}
	
	@PutMapping("manage/updateUser")
	public ResponseEntity<?> updateUser(@RequestBody UserUpdate updatedUser) {
		System.out.println("update invoked");
		Users existingUser = usersService.getUser(updatedUser.getUsername());
		if(existingUser == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		
		if(!(existingUser.getUsername().equalsIgnoreCase(updatedUser.getUsername())) && updatedUser.getUsername() != null) {
			existingUser.setUsername(updatedUser.getUsername());
		}
		
		if(!(existingUser.getEmail().equalsIgnoreCase(updatedUser.getEmail())) && updatedUser.getEmail()!=null) {
			existingUser.setEmail(updatedUser.getEmail());
		}
		
		if(!(existingUser.getGender().equalsIgnoreCase(updatedUser.getGender())) && updatedUser.getGender()!=null) {
			existingUser.setGender(updatedUser.getGender());
		}
		
		if(!(existingUser.getRole().equalsIgnoreCase(updatedUser.getRole())) && updatedUser.getRole()!=null) {
			existingUser.setRole(updatedUser.getRole());
		}
		if(!(existingUser.getDob().equalsIgnoreCase(updatedUser.getDob())) && updatedUser.getDob()!=null) {
			existingUser.setDob(updatedUser.getDob());
		}
		usersService.updateUser(existingUser);
		return ResponseEntity.ok("userUpdated");
	}
	
	
}
