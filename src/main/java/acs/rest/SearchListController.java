
package acs.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import acs.boundaries.SearchInputBoundary;
import acs.boundaries.SearchListBoundary;
import acs.logic.SearchListService;

@CrossOrigin("*")
@RestController
public class SearchListController {

	@Autowired
	private SearchListService searchListService;

	@RequestMapping(path = "/acs/searchList/getSearchList/{useremail}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public SearchListBoundary getSearchList(@PathVariable("useremail") String email) {

		return this.searchListService.getSearchList(email);
	}

	@RequestMapping(path = "/acs/searchList/clearSearchList", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void clearSearchList(@RequestBody SearchInputBoundary input) {

		this.searchListService.clearSearchList(input.getSearchListID());
	}

	@RequestMapping(path = "/acs/searchList/addSearchToSearchList", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void addSearchToSearchList(@RequestBody SearchInputBoundary input) {

		this.searchListService.addSearchToSearchList(input.getText(), input.getSearchListID());
	}

	@RequestMapping(path = "/acs/searchList/removeSearchFromSearchList", method = RequestMethod.DELETE, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public void removeProductToWathList(@RequestBody SearchInputBoundary input) {

		this.searchListService.removeSearchFromSearchList(input.getText(), input.getSearchListID());

	}

}
