package acs.logic;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.CartBoundary;
import acs.boundaries.OrderBoundary;
import acs.dal.CartDao;
import acs.dal.OrderDao;
import acs.dal.UserDao;
import acs.data.convertor.CartConverter;
import acs.data.convertor.OrderConverter;
import acs.data.entity.CartEntity;
import acs.data.entity.OrderEntity;
import acs.data.entity.ProductEntity;
import acs.data.entity.UserEntity;

@Service
public class CartService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private CartDao cartDao;

	@Autowired
	private OrderDao orderDao;

	@Autowired
	private CartConverter cartConverter;

	@Autowired
	private OrderConverter orderConverter;

	public CartService() {
	}

	@Transactional
	public CartBoundary createCart(String email) {

		Optional<UserEntity> results = this.userDao.findById(email);

		if (!results.isPresent()) {
			throw new RuntimeException("user doesn't exist :" + email);
		}

		UserEntity userE = results.get();

		if (userE.getCart() != null) {
			throw new RuntimeException("cart is already created for  :" + email);
		}

		CartEntity c = new CartEntity();

		c.setTotalPrice(0.0);
		c.setQuantity(new ArrayList<Long>());

		cartDao.save(c);

		userE.setCart(c);

		this.userDao.save(userE);

		return cartConverter.toBounudary(c);

	}

	@Transactional(readOnly = true)
	public CartBoundary getCart(String email) {

		Optional<UserEntity> results = this.userDao.findById(email);

		if (!results.isPresent()) {
			throw new RuntimeException("user doesn't exist :" + email);
		}

		UserEntity user = results.get();

		if (user.getCart() == null) {
			throw new RuntimeException("cart doesn't exist :" + email);
		}

		CartBoundary b = this.cartConverter.toBounudary(user.getCart());

		return b;
	}

	@Transactional
	public void clearCart(Long CartID) {

		Optional<CartEntity> cartResult = this.cartDao.findById(CartID);

		if (!cartResult.isPresent()) {
			throw new RuntimeException("cart doesn't exist :" + CartID);
		}

		CartEntity cart = cartResult.get();

		cart.getProducts().clear();
		cart.setTotalPrice(0.0);
		cart.getQuantity().clear();

		this.cartDao.save(cart);

	}

	@Transactional
	public void updateQuantity(Long CartID, ArrayList<Long> quantity) {

		Optional<CartEntity> cartResult = this.cartDao.findById(CartID);

		if (!cartResult.isPresent()) {
			throw new RuntimeException("cart doesn't exist :" + CartID);
		}

		CartEntity cart = cartResult.get();

		cart.setQuantity(quantity);

		cart.updateTotalPrice();

		this.cartDao.save(cart);

	}
	
	@Transactional
	public void setTotalPrice(Long CartID, Double s) {

		Optional<CartEntity> cartResult = this.cartDao.findById(CartID);

		if (!cartResult.isPresent()) {
			throw new RuntimeException("cart doesn't exist :" + CartID);
		}

		CartEntity cart = cartResult.get();

		cart.setTotalPrice(s);
		this.cartDao.save(cart);

	}

	@Transactional
	public OrderBoundary checkout(Long CartID) {

		Optional<CartEntity> cartResult = this.cartDao.findById(CartID);

		if (!cartResult.isPresent()) {
			throw new RuntimeException("cart doesn't exist :" + CartID);
		}

		CartEntity cart = cartResult.get();

		// decrement units in stock
		for (int i = 0; i < cart.getProducts().size(); i++) {
			ProductEntity p = cart.getProducts().get(i);

			Long productQuantity = cart.getQuantity().get(i);
			if (p.getUnitsInStock() < 0) {
				throw new RuntimeException("product is not in stock:" + p.getProductID());
			}
			p.setUnitsInStock(p.getUnitsInStock() - productQuantity);
			p.setUnitsOnOrder(p.getUnitsOnOrder() + productQuantity);

			if (p.getUnitsInStock() < 0) {
				throw new RuntimeException("product is not in stock:" + p.getProductID());
			}
		}

		OrderEntity order = new OrderEntity();

		order.setOrderDate(new Date());
		order.setShippedDate(new Date());
		order.setProducts(new ArrayList<ProductEntity>(cart.getProducts()));
		order.setQuantity(new ArrayList<Long>(cart.getQuantity()));
		order.setTotalPrice(cart.getTotalPrice());

		// add order to user
		cart.getUser().addOrder(order);

		// clear the user's cart
		cart.clear();

		this.cartDao.save(cart);
		this.orderDao.save(order);
		this.userDao.save(cart.getUser());
		
		
		//send message 
		sendOrderMessage(cart, order);

		return this.orderConverter.toBounudary(order);
	}
	
	void sendOrderMessage(CartEntity cart, OrderEntity order) {
		String email = cart.getUser().getEmail();
		String subject = "Thank you for order";
		String content ="<!DOCTYPE html>\n"
				+ "<html>\n"
				+ "<head>\n"
				+ "<style>\n"
				+ "table, th, td {\n"
				+ "  border: 1px solid black;\n"
				+ "}\n"
				+ "</style>\n"
				+ "</head>\n"
				+ "<body>\n"
				+ "\n"
				+ "<h2>Your order has been dispatched</h2>\n"
				+ "\n"
				+ "<p style=\"text-align: center;\"> your order</p>\n"
				+ "<p style=\"text-align: center;\">"+order.getOrderID()+"</p>\n"
				+ "\n"
				+ "<p style=\"text-align: center;\"> placed on "+order.getOrderDate()+"</p>\n"
				+ "\n"
				+ "<p style=\"text-align: center;\"> has been dispatched to</p>\n"
				+ " \n"
//				+ "<p style=\"text-align: center;\">delivery address</p>\n"
//				+ "\n"
//				+ "<p style=\"text-align: center;\">"+order.get+"</p>\n"
				+ "\n"
				+ "<table style=\"width:100%\">\n"
				+ "  <tr>\n"
				+ "    <th>PRODUCT</th>\n"
				+ "    <th>QTY</th> \n"
				+ "    <th>TOTAL</th>\n"
				+ "  </tr>\n" ;
			
		int i=0;
			for (ProductEntity product : order.getProducts()) {
				
				try {
					double qty = order.getQuantity().get(i);
					double total = qty * product.getUnitPrice();
					content += "  <tr>\n"
							+ "    <td>"+product.getTitle()+"</td>\n"
							+ "    <td>"+qty+"</td>\n"
							+ "    <td>"+total+"</td>\n"
							+ "  </tr>\n" ;	
				}catch(IndexOutOfBoundsException e) {}
				
		
				i++;
			}
				
			content+=	 "  \n"
				+ "</table>\n"
				+ "\n"
				+ "</body>\n"
				+ "</html>\n"
				+ "";
				 
		Helper.sendMsg(email,subject , content);
	}

	@Transactional(readOnly = true)
	public List<OrderBoundary> getOrderHistroy(String email) {

		Optional<UserEntity> results = this.userDao.findById(email);

		if (!results.isPresent()) {
			throw new RuntimeException("user doesn't exist :" + email);
		}

		UserEntity user = results.get();

		if (user.getOrders() == null) {
			throw new RuntimeException("orders don't exist :" + email);
		}

		List<OrderBoundary> orders = new ArrayList<OrderBoundary>();

		for (OrderEntity o : user.getOrders()) {
			orders.add(this.orderConverter.toBounudary(o));
		}

		return orders;
	}

}
