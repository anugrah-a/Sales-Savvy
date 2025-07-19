package com.salesSavvy.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Orders {
	@Id
	private String id;
	private int amount;
	private String currency;
	private String status;
	private String receipt;
	private String paymentId;
	@ManyToOne
	private Users user;
	@OneToMany(cascade = CascadeType.ALL)
	private List<CartData> items;
	public Orders() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Orders(String id, int amount, String currency, String status, String receipt, String paymentId, Users user,
			List<CartData> items) {
		super();
		this.id = id;
		this.amount = amount;
		this.currency = currency;
		this.status = status;
		this.receipt = receipt;
		this.paymentId = paymentId;
		this.user = user;
		this.items = items;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getReceipt() {
		return receipt;
	}
	public void setReceipt(String receipt) {
		this.receipt = receipt;
	}
	public String getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}
	public Users getUser() {
		return user;
	}
	public void setUser(Users user) {
		this.user = user;
	}
	public List<CartData> getItems() {
		return items;
	}
	public void setItems(List<CartData> items) {
		this.items = items;
	}
	@Override
	public String toString() {
		return "Orders [id=" + id + ", amount=" + amount + ", currency=" + currency + ", status=" + status
				+ ", receipt=" + receipt + ", paymentId=" + paymentId + "]";
	}
	
	
	
	
	

}
