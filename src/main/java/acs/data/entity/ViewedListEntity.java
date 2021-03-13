package acs.data.entity;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ViewedProducts")
public class ViewedListEntity {

	@Id
	@GeneratedValue
	private Long viewedListID;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_email")
	private UserEntity user;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "view_product", joinColumns = @JoinColumn(name = "view_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
	private Set<ProductEntity> products = new HashSet<ProductEntity>();

	public Long getViewedListID() {
		return viewedListID;
	}

	public void setViewedListID(Long viewedListID) {
		this.viewedListID = viewedListID;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public Set<ProductEntity> getProducts() {
		return products;
	}

	public void setProducts(Set<ProductEntity> products) {
		this.products = products;
	}

	public void addProduct(ProductEntity product) {

		if (this.products == null) {
			this.products = new HashSet<ProductEntity>();
		}

		this.products.add(product);

	}

	public void removeProduct(ProductEntity product) {

		if (this.products == null) {
			return;
		}

		this.products.remove(product);

	}

}
