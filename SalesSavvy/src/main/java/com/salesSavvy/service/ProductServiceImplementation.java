package com.salesSavvy.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.salesSavvy.entity.Product;
import com.salesSavvy.repository.ProductRepository;

@Service
public class ProductServiceImplementation implements ProductService{
	
	@Autowired
	ProductRepository repo;
	@Override
	public String addProduct(Product product) {
		// TODO Auto-generated method stub
		
		repo.save(product);
		
		return "Product added";
	}

	@Override
	public Product searchProduct(String name) {
		// TODO Auto-generated method stub
		return repo.findByName(name);
	}

	@Override
	public Product searchProduct(Long id) {
		// TODO Auto-generated method stub
		return repo.findById(id);
	}
	
	

	@Override
	public String updateProduct(Product product) {
		// TODO Auto-generated method stub
		repo.save(product);
		
		return "Product updated successfully";
	}

	@Override
	public String deleteProduct(int id) {
		// TODO Auto-generated method stub
		if(repo.existsById(id)) {
			repo.deleteById(id);
			return "Product deleted";
		}
		return "Product not found";
	}

	@Override
	public Product searchProuctByCategory(String category) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Product> getAllProduct() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	@Override
	public List<Product> searchProductList(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Product> getProductByName(String productName) {
		// TODO Auto-generated method stub
		return repo.findByNameIgnoreCase(productName);
	}

}
