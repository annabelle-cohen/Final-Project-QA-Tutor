package acs.data.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;


@Entity
@Table(name = "Cart")
public class CartEntity {
	@Id
	private Long cartID ; 
	private Long totalPrice ;
	
	@ManyToMany(cascade = {
		    CascadeType.PERSIST,
		    CascadeType.MERGE
		})
		@JoinTable(name = "cart_product",
		    joinColumns = @JoinColumn(name = "cart_id"),
		    inverseJoinColumns = @JoinColumn(name = "product_id")
		)
	private Set<ProductEntity> products = new HashSet<>();

	  @OneToOne(fetch = FetchType.LAZY)
	  @JoinColumn(name = "user_email")
	private UserEntity user ; 
	
	public Long getCartID() {
		return cartID;
	}

	public void setCartID(Long cartID) {
		this.cartID = cartID;
	}

	public Long getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Long totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Set<ProductEntity> getProducts() {
		return products;
	}

	public void setProducts(Set<ProductEntity> products) {
		this.products = products;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}
	
	
}
