package acs.boundaries;

public class ProductCartBoundary {

	private Long productID ; 
	private Long cartID  ;
	public Long getProductID() {
		return productID;
	}
	public void setProductID(Long productID) {
		this.productID = productID;
	}
	public Long getCartID() {
		return cartID;
	}
	public void setCartID(Long cartID) {
		this.cartID = cartID;
	}
	public ProductCartBoundary(Long productID, Long cartID) {
	
		this.productID = productID;
		this.cartID = cartID;
	}
	public ProductCartBoundary() {
		
	} 
	
	
}
