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
	@Column(name = "productid")
	private Long productID;
	private String title;
	private String subtitle;
	private String location;

	private String productDescription;

	private String productCondition;

	private Double UnitPrice;
	private Long UnitsInStock;
	private Long UnitsOnOrder;

	private Double shippingServiceCost;

	@OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL, orphanRemoval = true  )
	private List<ImageEntity> images = new ArrayList<>();

	@ManyToOne(fetch = FetchType.LAZY)
	private SupplierEntity supplier;

	// @ElementCollection

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "prod_cat", joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "productid"), inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "categoryid"))
	private List<CategoryEntity> categories = new ArrayList<>();

	@ManyToMany(mappedBy = "products")
	private Set<CartEntity> carts = new HashSet<>();

	public List<ImageEntity> getImages() {
		return images;
	}

	public void setImages(List<ImageEntity> images) {
		this.images = images;
	}

	public void addImage(ImageEntity image) {

		if (this.images == null) {
			this.images = new ArrayList<>();
		}
		this.images.add(image);
		image.setProduct(this);
	}

	public Long getProductID() {
		return productID;
	}

	public void setProductID(Long productID) {
		this.productID = productID;
	}

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public Double getUnitPrice() {
		return UnitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		UnitPrice = unitPrice;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Set<CartEntity> getCarts() {
		return carts;
	}

	public void setCarts(Set<CartEntity> carts) {
		this.carts = carts;
	}

	public List<CategoryEntity> getCategories() {
		return categories;
	}

	public void setCategories(List<CategoryEntity> categories) {
		this.categories = categories;
	}

	public void addCategory(CategoryEntity category) {
		this.categories.add(category);
		category.addProduct(this);
	}

	public String getProductCondition() {
		return productCondition;
	}

	public void setProductCondition(String productCondition) {
		this.productCondition = productCondition;
	}

	public Double getShippingServiceCost() {
		return shippingServiceCost;
	}

	public void setShippingServiceCost(Double shippingServiceCost) {
		this.shippingServiceCost = shippingServiceCost;
	}

}
