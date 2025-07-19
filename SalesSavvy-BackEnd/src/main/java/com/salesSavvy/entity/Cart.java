package com.salesSavvy.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;


@Entity
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "user_id", unique = true)
	@JsonBackReference          // prevents JSON loop Users → Cart → Users…
	private Users user;

	@OneToMany(
			mappedBy = "cart",
			cascade = CascadeType.ALL,
			orphanRemoval = true
			)
	@JsonManagedReference       // serialise Cart → CartItems
	private List<CartData> cartItems = new ArrayList<>();

	public Cart(Long id, Users user, List<CartData> cartItems) {
		super();
		this.id = id;
		this.user = user;
		this.cartItems = cartItems;
	}

	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public List<CartData> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartData> cartItems) {
		this.cartItems = cartItems;
	}


	
	
	
}
