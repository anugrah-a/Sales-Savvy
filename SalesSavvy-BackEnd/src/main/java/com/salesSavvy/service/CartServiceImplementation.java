package com.salesSavvy.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.salesSavvy.entity.Cart;
import com.salesSavvy.entity.CartData;
import com.salesSavvy.entity.Users;
import com.salesSavvy.repository.CartRepository;
import com.salesSavvy.repository.UsersRepository;

@Service
public class CartServiceImplementation implements CartService{
	@Autowired
	CartRepository cartRepo;
	@Autowired
	UsersRepository userRepo;

	@Override
	public void addCart(Cart cart) {
		cartRepo.save(cart);
		
	}

	@Override
	public void updateCart(Cart cart) {
		// TODO Auto-generated method stub
		cartRepo.save(cart);
		
	}

	@Override
	public List<CartData> getItems(String username) {
		// TODO Auto-generated method stub
		Users user = userRepo.findByUsernameIgnoreCase(username);
		if(user == null || user.getCart() == null) {
			return Collections.emptyList();
		}
		return user.getCart().getCartItems();
	}

	@Override
	public void clearCart(String username) {
		// TODO Auto-generated method stub
		Users u = userRepo.findByUsernameIgnoreCase(username);
		if(u != null && u.getCart() != null) {
			u.getCart().getCartItems().clear();
			cartRepo.save(u.getCart());
		}
	}

	@Override
	public List<CartData> cloneItems(String username) {
		// TODO Auto-generated method stub
		return getItems(username).stream().map(src -> {
            CartData copy = new CartData();
            copy.setProduct(src.getProduct());   // keep the same product ref
            copy.setQuantity(src.getQuantity());
            copy.setCart(null);                  // detach from cart
            return copy;
        }).toList();
	}
}
