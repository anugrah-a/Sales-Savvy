package com.salesSavvy.service;

import java.util.List;

import com.salesSavvy.entity.Cart;
import com.salesSavvy.entity.CartData;

public interface CartService {
	void addCart(Cart cart);
	void updateCart(Cart cart);
	List<CartData> getItems(String username);
	void clearCart(String username);
	List<CartData> cloneItems(String username);
}
