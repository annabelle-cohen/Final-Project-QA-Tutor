package acs.boundaries;

import java.util.ArrayList;

public class CartQuantityBoundary {

	Long CartID;
	ArrayList<Long> quantity;
	
	CartQuantityBoundary(){}

	public Long getCartID() {
		return CartID;
	}

	public void setCartID(Long cartID) {
		CartID = cartID;
	}

	public ArrayList<Long> getQuantity() {
		return quantity;
	}

	public void setQuantity(ArrayList<Long> quantity) {
		this.quantity = quantity;
	}

	public CartQuantityBoundary(Long cartID, ArrayList<Long> quantity) {
		super();
		CartID = cartID;
		this.quantity = quantity;
	}
	
	
}