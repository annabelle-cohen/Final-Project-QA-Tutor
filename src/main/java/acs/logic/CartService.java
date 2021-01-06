package acs.logic;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.CartBoundary;
import acs.dal.CartDao;
import acs.dal.UserDao;
import acs.data.convertor.CartConverter;
import acs.data.entity.CartEntity;

import acs.data.entity.UserEntity;

@Service
public class CartService {

	

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartDao cartDao;

	@Autowired
	private CartConverter cartConverter;

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
		
		cartDao.save(c);
		
		userE.setCart(c);

		this.userDao.save(userE);
		
		return cartConverter.toBounudary(c);

	}

	@Transactional(readOnly =true)
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

}
