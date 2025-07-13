package com.salesSavvy.service;

import java.util.List;

import com.salesSavvy.entity.Product;

public interface ProductService {
	String addProduct(Product product);
	Product searchProduct(String name);
	Product searchProduct(Long id);
	List<Product> searchProductList(String name);
	String updateProduct(Product product);
	String deleteProduct(int id);
	Product searchProuctByCategory(String category);
	List<Product> getAllProduct();
	List<Product> getProductByName(String productName);
	
}
