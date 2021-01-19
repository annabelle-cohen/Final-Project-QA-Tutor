package acs.data.entity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
@Table(name = "WatchList")
public class WatchListEntity {

	@Id
	@GeneratedValue
	private Long WatchListID;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_email")
	private UserEntity user;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "watch_product", joinColumns = @JoinColumn(name = "watch_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
	private Set<ProductEntity> products = new HashSet<ProductEntity>();

	public Long getWatchListID() {
		return WatchListID;
	}

	public void setWatchListID(Long watchListID) {
		WatchListID = watchListID;
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
