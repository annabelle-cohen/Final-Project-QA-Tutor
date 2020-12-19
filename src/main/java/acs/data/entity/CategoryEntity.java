package acs.data.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "Category")
public class CategoryEntity {

	@Id
	@Column(name = "categoryid")
	private Long categoryID;
	private String catgeroyName;
	private String description;
	private String thumbnail;

	@ManyToMany(mappedBy = "categories", fetch = FetchType.EAGER)
	private List<ProductEntity> products = new ArrayList<>();// = new ArrayList<ProductEntity>();

	public Long getCategoryID() {
		return categoryID;
	}

	public void setCategoryID(Long categoryID) {
		this.categoryID = categoryID;
	}

	public String getCatgeroyName() {
		return catgeroyName;
	}

	public void setCatgeroyName(String catgeroyName) {
		this.catgeroyName = catgeroyName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public List<ProductEntity> getProducts() {
		return products;
	}

	public void setProducts(List<ProductEntity> products) {
		this.products = products;
	}

	public void addProduct(ProductEntity product) {
		this.products.add(product);
	}

}
