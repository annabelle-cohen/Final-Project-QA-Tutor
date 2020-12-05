package acs.data.entity;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
@Entity
@Table(name = "Product")
public class ProductEntity {

	@Id
	@GeneratedValue
	private Long productID ; 
	private String productName; 
	private String productDescription ; 
	private Long QuantityPerUnit ; 
	private Long UnitPrice;
	private Long UnitWeight;
	private Long UnitsInStock;
	private Long UnitsOnOrder;
	
	
	@OneToMany(
	        cascade = CascadeType.ALL,
	        orphanRemoval = true
	    )
		 private List<ImageEntity> images = new ArrayList<>();
	
	 @ManyToOne(fetch = FetchType.LAZY)
	private SupplierEntity supplier;
	
	 
	 @ManyToMany(mappedBy = "products")
	 private Set<CategoryEntity> posts = new HashSet<>();
	 
	 @ManyToMany(mappedBy = "products")
	 private Set<CartEntity> carts = new HashSet<>();
	 
	 
	public List<ImageEntity> getImages() {
		return images;
	}
	public void setImages(List<ImageEntity> images) {
		this.images = images;
	}
	public Set<CategoryEntity> getPosts() {
		return posts;
	}
	public void setPosts(Set<CategoryEntity> posts) {
		this.posts = posts;
	}
	public Long getProductID() {
		return productID;
	}
	public void setProductID(Long productID) {
		this.productID = productID;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductDescription() {
		return productDescription;
	}
	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}
	public Long getQuantityPerUnit() {
		return QuantityPerUnit;
	}
	public void setQuantityPerUnit(Long quantityPerUnit) {
		QuantityPerUnit = quantityPerUnit;
	}
	public Long getUnitPrice() {
		return UnitPrice;
	}
	public void setUnitPrice(Long unitPrice) {
		UnitPrice = unitPrice;
	}
	public Long getUnitWeight() {
		return UnitWeight;
	}
	public void setUnitWeight(Long unitWeight) {
		UnitWeight = unitWeight;
	}
	public Long getUnitsInStock() {
		return UnitsInStock;
	}
	public void setUnitsInStock(Long unitsInStock) {
		UnitsInStock = unitsInStock;
	}
	public Long getUnitsOnOrder() {
		return UnitsOnOrder;
	}
	public void setUnitsOnOrder(Long unitsOnOrder) {
		UnitsOnOrder = unitsOnOrder;
	}
	
	public SupplierEntity getSupplier() {
		return supplier;
	}
	public void setSupplier(SupplierEntity supplier) {
		this.supplier = supplier;
	}
	
	
}
