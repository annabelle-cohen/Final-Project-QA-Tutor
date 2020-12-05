package acs.data.entity;


import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.Table;

import javax.persistence.*;
@Entity
@Table(name = "Category")
public class CategoryEntity {
	
@Id
@GeneratedValue
private Long categoryID;
private String catgeroyName ; 
private String description ;
private String thumbnail; 


@ManyToMany(cascade = {
	    CascadeType.PERSIST,
	    CascadeType.MERGE
	})
	@JoinTable(name = "category_product",
	    joinColumns = @JoinColumn(name = "category_id"),
	    inverseJoinColumns = @JoinColumn(name = "product_id")
	)
private Set<ProductEntity> products = new HashSet<>();


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


public Set<ProductEntity> getProducts() {
	return products;
}


public void setProducts(Set<ProductEntity> products) {
	this.products = products;
}
	
}
