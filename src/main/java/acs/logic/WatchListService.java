package acs.logic;

import java.util.HashSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.WatchListBoundary;
import acs.dal.ProductDao;
import acs.dal.UserDao;
import acs.dal.WatchListDao;

import acs.data.convertor.WatchListConverter;

import acs.data.entity.ProductEntity;
import acs.data.entity.UserEntity;
import acs.data.entity.WatchListEntity;

@Service
public class WatchListService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private WatchListDao watchListDao;

	@Autowired
	private ProductDao productDao;

	@Autowired
	private WatchListConverter watchListConverter;

	public WatchListService() {
	}

	@Transactional
	public WatchListBoundary createWatchList(String email) {

		Optional<UserEntity> results = this.userDao.findById(email);

		if (!results.isPresent()) {
			throw new RuntimeException("user doesn't exist :" + email);
		}

		UserEntity userE = results.get();

		if (userE.getWatchList() != null) {
			throw new RuntimeException("cart is already created for  :" + email);
		}

		WatchListEntity w = new WatchListEntity();

		w.setProducts(new HashSet<ProductEntity>());

		watchListDao.save(w);

		userE.setWatchList(w);

		this.userDao.save(userE);

		return watchListConverter.toBounudary(w);

	}

	@Transactional(readOnly = true)
	public WatchListBoundary getWatchList(String email) {

		Optional<UserEntity> results = this.userDao.findById(email);

		if (!results.isPresent()) {
			throw new RuntimeException("user doesn't exist :" + email);
		}

		UserEntity user = results.get();

		if (user.getWatchList() == null) {
			throw new RuntimeException("watchList doesn't exist :" + email);
		}

		WatchListBoundary b = this.watchListConverter.toBounudary(user.getWatchList());

		return b;
	}

	@Transactional
	public void clearWatchList(Long watchListID) {

		Optional<WatchListEntity> ListResult = this.watchListDao.findById(watchListID);

		if (!ListResult.isPresent()) {
			throw new RuntimeException("watchList doesn't exist :" + watchListID);
		}

		WatchListEntity watchlist = ListResult.get();

		watchlist.getProducts().clear();

		this.watchListDao.save(watchlist);

	}

	@Transactional
	public void addProductToWatchList(Long productID, Long WatchListID) {

		Optional<ProductEntity> results = this.productDao.findById(productID);

		if (!results.isPresent()) {
			throw new RuntimeException("product doesn't exist :" + productID);
		}

		Optional<WatchListEntity> watchResult = this.watchListDao.findById(WatchListID);

		if (!watchResult.isPresent()) {
			throw new RuntimeException("watchlist doesn't exist :" + productID);
		}

		ProductEntity product = results.get();

		if (product.getUnitsInStock() <= 0) {
			throw new RuntimeException("product is not in stock:" + productID);
		}

		WatchListEntity watchlist = watchResult.get();

		watchlist.addProduct(product);

		this.watchListDao.save(watchlist);

	}

	@Transactional
	public void removeProductFromWatchList(Long productID, Long WatchListID) {

		Optional<ProductEntity> results = this.productDao.findById(productID);

		if (!results.isPresent()) {
			throw new RuntimeException("product doesn't exist :" + productID);
		}

		Optional<WatchListEntity> watchResult = this.watchListDao.findById(WatchListID);

		if (!watchResult.isPresent()) {
			throw new RuntimeException("watchlist doesn't exist :" + WatchListID);
		}

		ProductEntity product = results.get();

		WatchListEntity watchlist = watchResult.get();

		watchlist.removeProduct(product);

		this.watchListDao.save(watchlist);

	}

}
