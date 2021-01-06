package acs.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import acs.boundaries.CartBoundary;

import acs.logic.CartService;

@CrossOrigin("*")
@RestController
public class CartController {

	@Autowired
	private CartService cartService;

	@RequestMapping(path = "/acs/carts/getCart/{useremail}", method = RequestMethod.GET,  produces = MediaType.APPLICATION_JSON_VALUE)
	public CartBoundary getCart(@PathVariable("useremail") String email) {

		return this.cartService.getCart(email);
	}

	@RequestMapping(path = "/acs/carts/createCart/{useremail}", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public CartBoundary createCart(@PathVariable("useremail") String email) {

		return this.cartService.createCart(email);
	}

}
