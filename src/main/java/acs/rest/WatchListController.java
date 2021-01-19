package acs.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import acs.boundaries.ProductCartBoundary;
import acs.boundaries.WatchListBoundary;
import acs.logic.WatchListService;

@CrossOrigin("*")
@RestController
public class WatchListController {

	@Autowired
	private WatchListService watchListService;

	@RequestMapping(path = "/acs/watchlist/getwatchList/{useremail}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public WatchListBoundary getWatchList(@PathVariable("useremail") String email) {

		return this.watchListService.getWatchList(email);
	}

	/*
	 * @RequestMapping(path = "/acs/carts/createCart/{useremail}", method =
	 * RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces =
	 * MediaType.APPLICATION_JSON_VALUE) public CartBoundary
	 * createCart(@PathVariable("useremail") String email) {
	 * 
	 * return this.cartService.createCart(email); }
	 */

	@RequestMapping(path = "/acs/watchlist/clearwatchList", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void clearWatchList(@RequestBody ProductCartBoundary input) {

		this.watchListService.clearWatchList(input.getWatchListID());
	}

	@RequestMapping(path = "/acs/watchlist/addProductToWatchList", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void addProductToWathList(@RequestBody ProductCartBoundary input) {

		this.watchListService.addProductToWatchList(input.getProductID(), input.getWatchListID());
	}

	@RequestMapping(path = "/acs/watchlist/removeProductFromWatchList", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void removeProductToWathList(@RequestBody ProductCartBoundary input) {

		this.watchListService.removeProductFromWatchList(input.getProductID(), input.getWatchListID());

	}

}
