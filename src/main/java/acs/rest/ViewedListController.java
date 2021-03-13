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
import acs.boundaries.ViewedListBoundary;
import acs.logic.ViewedListService;

@CrossOrigin("*")
@RestController
public class ViewedListController {

	@Autowired
	private ViewedListService viewedListService;

	@RequestMapping(path = "/acs/viewedlist/getViewedList/{useremail}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ViewedListBoundary getWatchList(@PathVariable("useremail") String email) {

		return this.viewedListService.getViewedList(email);
	}

	@RequestMapping(path = "/acs/viewedlist/clearViewedList", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void clearWatchList(@RequestBody ProductCartBoundary input) {

		this.viewedListService.clearViewedList(input.getViewedListID());
	}

	@RequestMapping(path = "/acs/viewedlist/addProductToViewedList", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void addProductToWathList(@RequestBody ProductCartBoundary input) {

		this.viewedListService.addProductToViewedList(input.getProductID(), input.getViewedListID());
	}

	@RequestMapping(path = "/acs/viewedlist/removeProductFromViewedList", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void removeProductToWathList(@RequestBody ProductCartBoundary input) {

		this.viewedListService.removeProductFromViewedList(input.getProductID(), input.getViewedListID());

	}

}
