package acs.data.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity(name = "Supplier")
public class SupplierEntity {
	@Id
    @GeneratedValue
	private Long supplierID;
	
	private String supplierUserName ;
	private String email; 
	private String positiveFeedbackPercent;
	@OneToMany(
	        cascade = CascadeType.ALL,
	        orphanRemoval = true
	    )
		 private List<ProductEntity> products = new ArrayList<>();
	
	public Long getSupplierID() {
		return supplierID;
	}

	public void setSupplierID(Long supplierID) {
		this.supplierID = supplierID;
	}

	
	public String getSupplierUserName() {
		return supplierUserName;
	}

	public void setSupplierUserName(String supplierUserName) {
		this.supplierUserName = supplierUserName;
	}

	public String getPositiveFeedbackPercent() {
		return positiveFeedbackPercent;
	}

	public void setPositiveFeedbackPercent(String positiveFeedbackPercent) {
		this.positiveFeedbackPercent = positiveFeedbackPercent;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<ProductEntity> getProducts() {
		return products;
	}

	public void setProducts(List<ProductEntity> products) {
		this.products = products;
	}

	
	
	
}
