package com.salesSavvy.dto;

public class PaymentVeriyRequest {
	String username;
	String orderId;
	String paymentId;
	String signature;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	public PaymentVeriyRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PaymentVeriyRequest(String username, String orderId, String paymentId, String signature) {
		super();
		this.username = username;
		this.orderId = orderId;
		this.paymentId = paymentId;
		this.signature = signature;
	}
	@Override
	public String toString() {
		return "PaymentVeriyRequest [username=" + username + ", orderId=" + orderId + ", paymentId=" + paymentId
				+ ", signature=" + signature + "]";
	}
	
	
}
