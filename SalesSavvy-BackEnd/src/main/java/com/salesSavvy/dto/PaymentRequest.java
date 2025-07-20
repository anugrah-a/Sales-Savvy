package com.salesSavvy.dto;

public class PaymentRequest {
	String username;
	int amount;
	public PaymentRequest(String username, int amount) {
		super();
		this.username = username;
		this.amount = amount;
	}
	public PaymentRequest() {
		super();

	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	@Override
	public String toString() {
		return "PaymentRequest [username=" + username + ", amount=" + amount + "]";
	}

}
