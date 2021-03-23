
package acs.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import acs.boundaries.OrderBoundary;
import acs.logic.CartService;

@CrossOrigin("*")
@RestController
public class OrderController {

	@Autowired
	private CartService cartService;

	@RequestMapping(path = "/acs/orders/getOrderHistroy/{useremail}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<OrderBoundary> getOrderHistroy(@PathVariable("useremail") String email) {

		return this.cartService.getOrderHistroy(email);
	}

}
