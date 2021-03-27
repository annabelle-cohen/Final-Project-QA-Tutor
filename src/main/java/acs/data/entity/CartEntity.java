package acs.data.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "Cart")
public class CartEntity {

	@Id
	@GeneratedValue
	private Long cartID;
	private Double totalPrice;

	// this is a set
	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "cart_product", joinColumns = @JoinColumn(name = "cart_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
	private List<ProductEntity> products = new ArrayList<ProductEntity>();

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_email")
	private UserEntity user;

	@ElementCollection
	private List<Long> quantity = new ArrayList<Long>();

	public Long getCartID() {
		return cartID;
	}

	public void setCartID(Long cartID) {
		this.cartID = cartID;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public List<ProductEntity> getProducts() {
		return products;
	}

	public void setProducts(List<ProductEntity> products) {
		this.products = products;
	}

	public void addProduct(ProductEntity product) {

		if (this.products == null) {
			this.products = new ArrayList<ProductEntity>();
		}

		this.products.add(product);

		product.addCart(this);
		// this.updateTotalPrice();
	}

	public void removeProduct(ProductEntity product) {

		if (this.products == null) {
			return;
		}

		this.products.remove(product);

		product.removeCart(this);
		// this.updateTotalPrice();

	}

	public void updateTotalPrice() {

		Double totalPrice = 0.0;

		for (int i = 0; i < this.quantity.size(); i++) {
			Long q = this.quantity.get(i);

			if (i < this.products.size()) {
				totalPrice += q * this.products.get(i).getUnitPrice();
			}
		}
		this.totalPrice = totalPrice;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public List<Long> getQuantity() {
		return quantity;
	}

	public void setQuantity(List<Long> quantity) {
		this.quantity = quantity;
	}

	public void clear() {
		this.quantity.clear();
		this.products.clear();
		this.totalPrice = 0.0;

	}

}
