package acs.boundaries;

import java.util.ArrayList;
import java.util.List;


public class CartBoundary {
	private Long cartID ; 
	private Double totalPrice ;
	
	private List<ProductBoundary> products = new ArrayList <ProductBoundary>();
	
	private List<Long> quantity = new ArrayList <Long>();
	
	public Long getCartID() {
		return cartID;
	}

	public void setCartID(Long cartID) {
		this.cartID = cartID;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<ProductBoundary> getProducts() {
		return products;
	}

	public void setProducts(List<ProductBoundary> products) {
		this.products = products;
	}

	public CartBoundary(Long cartID, Double totalPrice, List<ProductBoundary> products) {
		super();
		this.cartID = cartID;
		this.totalPrice = totalPrice;
		this.products = products;
	}
	
	public CartBoundary() {}

	public List<Long> getQuantity() {
		return quantity;
	}

	public void setQuantity(List<Long> quantity) {
		this.quantity = quantity;
	}

}
