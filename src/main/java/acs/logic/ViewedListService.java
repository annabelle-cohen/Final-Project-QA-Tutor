package acs.logic;

import java.util.HashSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import acs.boundaries.ViewedListBoundary;
import acs.dal.ProductDao;
import acs.dal.UserDao;
import acs.dal.ViewedListDao;
import acs.data.convertor.ViewedListConverter;
import acs.data.entity.ProductEntity;
import acs.data.entity.UserEntity;
import acs.data.entity.ViewedListEntity;

@Service
public class ViewedListService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private ViewedListDao viewedListDao;

	@Autowired
	private ProductDao productDao;

	@Autowired
	private ViewedListConverter viewedListConverter;

	public ViewedListService() {
	}

	@Transactional
	public ViewedListBoundary createViewedList(String email) {

		Optional<UserEntity> results = this.userDao.findById(email);

		if (!results.isPresent()) {
			throw new RuntimeException("user doesn't exist :" + email);
		}

		UserEntity userE = results.get();

		if (userE.getViewedList() != null) {
			throw new RuntimeException("Viewed list is already created for  :" + email);
		}

		ViewedListEntity w = new ViewedListEntity();

		w.setProducts(new HashSet<ProductEntity>());

		viewedListDao.save(w);

		userE.setViewedList(w);

		this.userDao.save(userE);

		return viewedListConverter.toBounudary(w);
	}

	@Transactional(readOnly = true)
	public ViewedListBoundary getViewedList(String email) {

		Optional<UserEntity> results = this.userDao.findById(email);

		if (!results.isPresent()) {
			throw new RuntimeException("user doesn't exist :" + email);
		}

		UserEntity user = results.get();

		if (user.getViewedList() == null) {
			throw new RuntimeException("viewed List doesn't exist :" + email);
		}

		ViewedListBoundary b = this.viewedListConverter.toBounudary(user.getViewedList());

		return b;
	}

	@Transactional
	public void clearViewedList(Long viewedListID) {

		Optional<ViewedListEntity> ListResult = this.viewedListDao.findById(viewedListID);

		if (!ListResult.isPresent()) {
			throw new RuntimeException("viewed List doesn't exist :" + viewedListID);
		}

		ViewedListEntity watchlist = ListResult.get();

		watchlist.getProducts().clear();

		this.viewedListDao.save(watchlist);
	}

	@Transactional
	public void addProductToViewedList(Long productID, Long viewedListID) {

		Optional<ProductEntity> results = this.productDao.findById(productID);

		if (!results.isPresent()) {
			throw new RuntimeException("product doesn't exist :" + productID);
		}

		Optional<ViewedListEntity> viewedResult = this.viewedListDao.findById(viewedListID);

		if (!viewedResult.isPresent()) {
			throw new RuntimeException("viewed list doesn't exist :" + productID);
		}

		ProductEntity product = results.get();

		if (product.getUnitsInStock() <= 0) {
			throw new RuntimeException("product is not in stock:" + productID);
		}

		ViewedListEntity viewedlist = viewedResult.get();

		viewedlist.addProduct(product);

		this.viewedListDao.save(viewedlist);
	}

	@Transactional
	public void removeProductFromViewedList(Long productID, Long ViewedListID) {

		Optional<ProductEntity> results = this.productDao.findById(productID);

		if (!results.isPresent()) {
			throw new RuntimeException("product doesn't exist :" + productID);
		}

		Optional<ViewedListEntity> viewedResult = this.viewedListDao.findById(ViewedListID);

		if (!viewedResult.isPresent()) {
			throw new RuntimeException("viewed list doesn't exist :" + ViewedListID);
		}

		ProductEntity product = results.get();

		ViewedListEntity viewedlist = viewedResult.get();

		viewedlist.removeProduct(product);

		this.viewedListDao.save(viewedlist);
	}

}
