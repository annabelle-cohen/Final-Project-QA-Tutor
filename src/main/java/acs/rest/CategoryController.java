package acs.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import acs.boundaries.CategoryBoundary;
import acs.boundaries.SearchBoundary;
import acs.logic.CategoryService;

@CrossOrigin("*")
@RestController
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@RequestMapping(path = "/acs/category/all", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<CategoryBoundary> getAllCategroies(@RequestBody SearchBoundary input) {

		int newPage = 0;
		int newSize = 1;

		if (input.getPage() != null) {
			newPage = input.getPage();
		}

		if (input.getSize() != null) {
			newSize = input.getSize();
		}

		return this.categoryService.getAllCategories(newPage, newSize);
	}

	@RequestMapping(path = "/acs/category", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public CategoryBoundary getCategory(@RequestBody SearchBoundary input) {

		return this.categoryService.getCategory(input.getCategoryID());
	}

}
