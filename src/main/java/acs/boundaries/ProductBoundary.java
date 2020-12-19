package acs.boundaries;

import java.util.ArrayList;
import java.util.List;

import acs.data.entity.SupplierEntity;

public class ProductBoundary {

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

	private List<ImageBoundary> images = new ArrayList<>();

	private SupplierEntity supplier;

	private List<CategoryBoundary> categories = new ArrayList<>();

	public ProductBoundary() {
	}

	public ProductBoundary(Long productID, String title, String subtitle, String location, String productDescription,
			String productCondition, Double unitPrice, Long unitsInStock, Long unitsOnOrder, Double shippingServiceCost,
			List<ImageBoundary> images, SupplierEntity supplier, List<CategoryBoundary> categories) {
		super();
		this.productID = productID;
		this.title = title;
		this.subtitle = subtitle;
		this.location = location;
		this.productDescription = productDescription;
		this.productCondition = productCondition;
		UnitPrice = unitPrice;
		UnitsInStock = unitsInStock;
		UnitsOnOrder = unitsOnOrder;
		this.shippingServiceCost = shippingServiceCost;
		this.images = images;
		this.supplier = supplier;
		this.categories = categories;
	}

	public Long getProductID() {
		return productID;
	}

	public void setProductID(Long productID) {
		this.productID = productID;
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

	public String getProductDescription() {
		return productDescription;
	}

	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}

	public String getProductCondition() {
		return productCondition;
	}

	public void setProductCondition(String productCondition) {
		this.productCondition = productCondition;
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

	public Double getShippingServiceCost() {
		return shippingServiceCost;
	}

	public void setShippingServiceCost(Double shippingServiceCost) {
		this.shippingServiceCost = shippingServiceCost;
	}

	public List<ImageBoundary> getImages() {
		return images;
	}

	public void setImages(List<ImageBoundary> images) {
		this.images = images;
	}

	public SupplierEntity getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierEntity supplier) {
		this.supplier = supplier;
	}

	public List<CategoryBoundary> getCategories() {
		return categories;
	}

	public void setCategories(List<CategoryBoundary> categories) {
		this.categories = categories;
	}

}
