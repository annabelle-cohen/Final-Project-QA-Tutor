package acs.boundaries;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import acs.data.entity.ShipperEntity;

public class OrderBoundary {

	@Id
	@GeneratedValue
	private Long orderID;

	private Date orderDate;
	private Date shippedDate;
	private String shippedVia;

	private ShipperEntity shipper;

	private Double totalPrice;

	private List<ProductBoundary> products = new ArrayList<ProductBoundary>();

	private List<Long> quantity = new ArrayList<Long>();

	public Long getOrderID() {
		return orderID;
	}

	public void setOrderID(Long orderID) {
		this.orderID = orderID;
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

	public List<Long> getQuantity() {
		return quantity;
	}

	public void setQuantity(List<Long> quantity) {
		this.quantity = quantity;
	}

	public OrderBoundary() {
		super();
	}

}
