package acs.data.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "user")
public class UserEntity {
	@Id
	@Column(name = "email")
	private String email;
	private String password;

	@OneToOne(mappedBy = "user")
	private CartEntity cart;

	@OneToOne(mappedBy = "user")
	private WatchListEntity watchList;

	@OneToOne(mappedBy = "user")
	private ViewedListEntity viewedList;

	@OneToOne(mappedBy = "user")
	private SearchListEntity searchList;

	@OneToOne(mappedBy = "user")
	private PersonalInfoEntity personalInfo;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderEntity> orders = new ArrayList<>();

	public UserEntity() {
		super();
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public PersonalInfoEntity getPersonalInfo() {
		return personalInfo;
	}

	public void setPersonalInfo(PersonalInfoEntity personalInfo) {
		this.personalInfo = personalInfo;
	}

	public CartEntity getCart() {
		return cart;
	}

	public void setCart(CartEntity cart) {
		this.cart = cart;

		cart.setUser(this);
	}

	public List<OrderEntity> getOrders() {
		return orders;
	}

	public void setOrders(List<OrderEntity> orders) {
		this.orders = orders;
	}

	public void addOrder(OrderEntity order) {
		this.orders.add(order);
		order.setUser(this);
	}

	public WatchListEntity getWatchList() {
		return watchList;
	}

	public void setWatchList(WatchListEntity watchList) {
		this.watchList = watchList;
		watchList.setUser(this);
	}

	public ViewedListEntity getViewedList() {
		return viewedList;
	}

	public void setViewedList(ViewedListEntity viewedList) {
		this.viewedList = viewedList;
		viewedList.setUser(this);
	}

	public SearchListEntity getSearchList() {
		return searchList;
	}

	public void setSearchList(SearchListEntity searchList) {
		this.searchList = searchList;
		searchList.setUser(this);
	}

}