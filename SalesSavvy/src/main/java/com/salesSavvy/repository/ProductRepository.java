package com.salesSavvy.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.salesSavvy.entity.Product;
import java.util.List;



public interface ProductRepository extends JpaRepository<Product, Integer>{
	
	Product findById(Long id);
	Product findByName(String name);
	void deleteById(int id);
	Product findByCategory(String category);
	List<Product> findByNameIgnoreCase(String name);
}
