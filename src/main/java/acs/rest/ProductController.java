package acs.rest;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import acs.boundaries.ProductBoundary;
import acs.boundaries.SearchBoundary;
import acs.logic.ProductService;

@CrossOrigin("*")
@RestController
public class ProductController {

	@Autowired
	private ProductService productService;

	@RequestMapping(path = "/acs/products/getByCategory", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ProductBoundary> getByCategory(@RequestBody SearchBoundary input) {

		int newPage = 0;
		int newSize = 1;

		if (input.getPage() != null) {
			newPage = input.getPage();
		}

		if (input.getSize() != null) {
			newSize = input.getSize();
		}

		return this.productService.getProducstByCategroyID(input.getCategoryID(), newPage, newSize);
	}

	@RequestMapping(path = "/acs/products/getByKeyword", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ProductBoundary> getByKeyword(@RequestBody SearchBoundary input) {

		int newPage = 0;
		int newSize = 1;

		if (input.getPage() != null) {
			newPage = input.getPage();
		}

		if (input.getSize() != null) {
			newSize = input.getSize();
		}
		return this.productService.getProducstByKeyword(input.getKeyword(), newPage, newSize);
	}

}
