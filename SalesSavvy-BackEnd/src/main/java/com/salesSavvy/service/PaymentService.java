package com.salesSavvy.service;

import com.razorpay.Order;
import com.razorpay.RazorpayException;

public interface PaymentService {
	Order createRzpOrder(int amountPaise) throws RazorpayException;
	public boolean verifySignature(String orderId, String paymentId,
                                   String signature);
	public String getKeyId();
}
