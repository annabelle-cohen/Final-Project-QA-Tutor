package acs.data.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity(name = "Supplier")
public class SupplierEntity {
	@Id
    @GeneratedValue
	private Long supplierID;
	
	private String companyName ;
	private String email; 
	
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

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
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
