package com.salesSavvy.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayException;
import com.salesSavvy.dto.PaymentRequest;
import com.salesSavvy.dto.PaymentVeriyRequest;
import com.salesSavvy.entity.Orders;
import com.salesSavvy.entity.Users;
import com.salesSavvy.repository.OrderRepository;
import com.salesSavvy.service.CartService;
import com.salesSavvy.service.PaymentService;
import com.salesSavvy.service.UsersService;

@RestController
@CrossOrigin("*")
public class PaymentController {
	@Autowired
	UsersService userService;
	@Autowired
	CartService cartService;
	@Autowired
	PaymentService paymentService;
	@Autowired
	OrderRepository orderRepo;

    
	@PostMapping("/payment/create")
	public ResponseEntity<?> create(@RequestBody PaymentRequest req) throws RazorpayException {

		Users u = userService.getUser(req.getUsername());
		if (u == null) return ResponseEntity.badRequest().body("user not found");

		Order rzp = paymentService.createRzpOrder(req.getAmount());

		Orders o  = new Orders();
		o.setId(rzp.get("id"));
		o.setAmount(req.getAmount());
		o.setCurrency("INR");
		o.setStatus("CREATED");
		o.setUser(u);
		o.setItems(cartService.cloneItems(req.getUsername()));
		orderRepo.save(o);
		Integer amount = req.getAmount();
		if(paymentService.getKeyId() == null || rzp.get("id")== null || amount == null) {
			System.out.println(paymentService.getKeyId());
			//System.out.println(rzp.get("id"));
			System.out.println(amount);
			
			return ResponseEntity.internalServerError().body("data is null");
		}
		return ResponseEntity.ok(Map.of(
				"key",     paymentService.getKeyId(),
				"orderId", rzp.get("id"),
				"amount",  req.getAmount()
				));
	}

	/* ---------- 2. verify after payment ---------- */
	@PostMapping("/payment/verify")
	public ResponseEntity<?> verify(@RequestBody PaymentVeriyRequest req) throws RazorpayException {

		if (!paymentService.verifySignature(req.getOrderId(), req.getPaymentId(), req.getSignature()))
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("signature mismatch");

		Orders ord = orderRepo.findById(req.getOrderId()).orElseThrow();
		ord.setStatus("PAID");
		ord.setPaymentId(req.getPaymentId());
		orderRepo.save(ord);

		cartService.clearCart(req.getUsername());   // empty cart

		return ResponseEntity.ok(ord.getId()); // for React redirect
	}

	/* ---------- 3a. raw entity (optional) ---------- */
	@GetMapping("/order/{orderId}")
	public Orders getOrder(@PathVariable String orderId) {
		return orderRepo.findById(orderId).orElse(null);
	}

	/* ---------- 3b. lean summary for React ---------- */
	@GetMapping("/order/summary/{orderId}")
	public Map<String, Object> getOrderSummary(@PathVariable String orderId) {

		Orders o = orderRepo.findById(orderId).orElse(null);
		if (o == null) return Map.of("error", "not-found");

		int totalRupees = o.getAmount() / 100;

		return Map.of(
				"orderId", o.getId(),
				"status",  o.getStatus(),
				"total",   totalRupees,
				"items",   o.getItems().stream().map(ci -> Map.of(
						"name",  ci.getProduct().getName(),
						"qty",   ci.getQuantity(),
						"price", ci.getProduct().getPrice()
						)).toList()
				);
	} 
}