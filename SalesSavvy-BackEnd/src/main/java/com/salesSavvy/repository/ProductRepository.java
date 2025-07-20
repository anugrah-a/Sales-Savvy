package com.salesSavvy.repository;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salesSavvy.entity.Product;



public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	Optional<Product> findById(int id);
	Product findById(Long id);
	Product findByName(String name);
	void deleteById(int id);
	Product findByCategory(String category);
	List<Product> findByNameIgnoreCase(String name);
}
