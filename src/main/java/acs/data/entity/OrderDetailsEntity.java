package acs.data.entity;

import javax.persistence.*;

@Entity
@Table(name = "OrderDetails")
public class OrderDetailsEntity {

	@Id
	private Long orderDetailsID;
	
	  @OneToOne(fetch = FetchType.LAZY)
	    @MapsId
      private OrderEntity order  ;
	  private Long unitPrice ; 
	  private Long quantity ; 
	  private Long discount ;
	  
	  
	  @OneToOne(fetch = FetchType.LAZY)
	//  @JoinColumn(name = "product_id")
	  private ProductEntity product ;

	public OrderEntity getOrder() {
		return order;
	}

	public void setOrder(OrderEntity order) {
		this.order = order;
	}

	public Long getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Long unitPrice) {
		this.unitPrice = unitPrice;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Long getDiscount() {
		return discount;
	}

	public void setDiscount(Long discount) {
		this.discount = discount;
	}

	public ProductEntity getProduct() {
		return product;
	}

	public void setProduct(ProductEntity product) {
		this.product = product;
	}

	public Long getOrderDetailsID() {
		return orderDetailsID;
	}

	public void setOrderDetailsID(Long orderDetailsID) {
		this.orderDetailsID = orderDetailsID;
	} 
	  
	  
}
