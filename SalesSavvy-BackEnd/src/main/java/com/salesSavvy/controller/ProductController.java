package com.salesSavvy.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.salesSavvy.dto.UpdateProduct;
import com.salesSavvy.entity.Cart;
import com.salesSavvy.entity.CartData;
import com.salesSavvy.entity.Product;
import com.salesSavvy.entity.Users;
import com.salesSavvy.service.CartService;
import com.salesSavvy.service.ProductService;
import com.salesSavvy.service.UsersService;

@CrossOrigin("*")
@RestController
@RequestMapping("/products")
public class ProductController {
	@Autowired
	ProductService productService;
	@Autowired
	UsersService usersService;
	@Autowired
	CartService cartService;
	@PostMapping("/addProduct")
	public String addProduct(@RequestBody Product product)
	{
		if(product.getName() == null || product.getName().trim().isEmpty()) {
			return "error";
		}
		return productService.addProduct(product);

	}
	@PutMapping("/updateProduct") 
	public ResponseEntity<?> updateProduct(@RequestBody Product product) {
		//TODO: process POST request
		return ResponseEntity.ok().body("product updated");
	}

	@GetMapping("/searchProduct")
	public ResponseEntity<?> searchProduct(@RequestParam String productName) {
		if(productName.isEmpty()) {
			return ResponseEntity.badRequest().body("Product name cannot be null");
		}
		List<Product> products = productService.getProductByName(productName);
		return ResponseEntity.ok(products);
	}

	@DeleteMapping("/deleteProduct")
	public ResponseEntity<?> removeProduct(@RequestParam Integer productId) {
		if(productId  == null ) {
			return ResponseEntity.badRequest().body("Id cannot be null");
		}
		if(productService.searchProductById(productId) == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product does not exist");
		}
		productService.deleteProduct(productId);
		return ResponseEntity.ok().body("Product deleted");
	}

	@GetMapping("/getAllProduct")
	public List<Product> getAllProduct() {
		return productService.getAllProduct();
	}

	@PostMapping("/addToCart")
	public String addToCart(@RequestBody CartData data) {
		//TODO: process POST request
		String username = data.getUsername();
		Users user = usersService.getUser(username);
		if(user == null) {
			return  "user not found";
		}
		Product product = productService.searchProductById(data.getProductId());
		
		if(product == null) {
			return "product not found";
		}
		Cart cart = user.getCart();
		
		if(cart == null) {
			cart = new Cart();
			cart.setUser(user);
			user.setCart(cart);
			cartService.addCart(cart);	
		}
		List<CartData> items = cart.getCartItems();
		
		if(items == null) {
			items = new ArrayList<>();
		}
		boolean found = false;

		for(CartData cd : items) {
			if(cd.getProduct().getId() == (product.getId())) {
				cd.setQuantity(cd.getQuantity() + data.getQuantity());
				found = true;
				break;
			}
		}

		if(!found) {
			CartData newData = new CartData();
			newData.setCart(cart);
			newData.setProduct(product);
			newData.setQuantity(data.getQuantity());
			items.add(newData);	
		}
		cart.setCartItems(items);
		cartService.addCart(cart);
		return "cart added";
	}

	@GetMapping("/getCart/{username}")
	public ResponseEntity<?> getCart(@PathVariable String username) {
		try {
			Users u = usersService.getUser(username);
			if(u == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("user not found");
			}
			if(u.getCart() == null) {
				return ResponseEntity.ok(new ArrayList<>());
			}
			//System.out.println(u.getCart().getCartItems());
			List<CartData> items = u.getCart().getCartItems();
			return ResponseEntity.ok(items);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occured while fetching cart");
		}

	}

	@GetMapping("/getProductById")
	public ResponseEntity<?> getProductById(@RequestParam Integer productId) {
		if(productId  == null ) {
			return ResponseEntity.badRequest().body("Id cannot be null");
		}
		if(productService.searchProductById(productId) == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product does not exist");
		}
		Product product = productService.searchProductById(productId);
		return ResponseEntity.ok(product);
	}

	@PutMapping("updateUser/{productId}")
	public ResponseEntity<?> putMethodName(@PathVariable Integer productId, @RequestBody UpdateProduct newProduct) {
		//TODO: process PUT request
		Product existingProduct = productService.searchProductById(productId);
		if(existingProduct == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		return ResponseEntity.ok(null);
	}

	@DeleteMapping("/clearCart")
	public void clearCart(String username) {
		cartService.clearCart(username);
	}
} 

