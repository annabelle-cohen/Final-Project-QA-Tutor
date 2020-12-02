package acs.data.entity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Userorder")
public class OrderEntity {
	@Id
	@GeneratedValue
	private Long orderID ; 
	private Long orderNumber ; 
	private Date orderDate; 
	private Date shippedDate ; 
	private String shippedVia;
	
	 @ManyToOne(fetch = FetchType.LAZY)
	private ShipperEntity shipper ;
	
	 @ManyToOne(fetch = FetchType.LAZY)
	private UserEntity user ;
	 
	 @OneToOne(mappedBy = "order")
		private OrderDetailsEntity orderDetails ;

	public Long getOrderID() {
		return orderID;
	}

	public void setOrderID(Long orderID) {
		this.orderID = orderID;
	}

	public Long getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(Long orderNumber) {
		this.orderNumber = orderNumber;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public Date getShippedDate() {
		return shippedDate;
	}

	public void setShippedDate(Date shippedDate) {
		this.shippedDate = shippedDate;
	}

	public String getShippedVia() {
		return shippedVia;
	}

	public void setShippedVia(String shippedVia) {
		this.shippedVia = shippedVia;
	}

	public ShipperEntity getShipper() {
		return shipper;
	}

	public void setShipper(ShipperEntity shipper) {
		this.shipper = shipper;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public OrderDetailsEntity getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(OrderDetailsEntity orderDetails) {
		this.orderDetails = orderDetails;
	} 
	 
		
}
