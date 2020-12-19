package acs.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.CategoryBoundary;
import acs.dal.CategoryDao;
import acs.data.convertor.CategoryConverter;
import acs.data.entity.CategoryEntity;

@Service
public class CategoryService {

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private CategoryConverter categoryConverter;

	public CategoryDao getCategoryDao() {
		return this.categoryDao;
	};

	public CategoryService() {

	}

	@Transactional
	CategoryEntity createCategroy(CategoryEntity update) {

		Optional<CategoryEntity> catA = this.categoryDao.findById(update.getCategoryID());

		if (catA.isPresent()) {
			throw new RuntimeException("category already exists");
		}

		CategoryEntity cat = new CategoryEntity();

		if (update.getCategoryID() != null) {
			cat.setCategoryID(update.getCategoryID());
		} else {
			new RuntimeException("categroy id can't be null");
		}

		if (Helper.isDefined(update.getCatgeroyName())) {
			cat.setCatgeroyName(update.getCatgeroyName());
		} else {
			new RuntimeException("categroy name can't be null");
		}

		if (Helper.isDefined(update.getCatgeroyName())) {
			cat.setCatgeroyName(update.getCatgeroyName());
		}

		if (Helper.isDefined(update.getThumbnail())) {
			cat.setThumbnail(update.getThumbnail());
		}

		return this.categoryDao.save(cat);

//		return cat;

	}

	@Transactional(readOnly = true)
	public CategoryEntity isCategroyAvailable(Long CategoryID) {

		Optional<CategoryEntity> cat = this.categoryDao.findById(CategoryID);
		if (cat.isPresent()) {
			return cat.get();
		} else {
			return null;
		}
	}

	@Transactional(readOnly = true)
	public CategoryBoundary getCategory(Long CategoryID) {
		Optional<CategoryEntity> cat = this.categoryDao.findById(CategoryID);
		if (cat.isPresent()) {
			return this.categoryConverter.toBoundary(cat.get());
		} else {
			throw new RuntimeException("category doesn't exist");
		}
	}

	@Transactional(readOnly = true)
	public List<CategoryBoundary> getAllCategories(int page, int size) {
		Page<CategoryEntity> results = this.categoryDao.findAll(PageRequest.of(page, size));

		List<CategoryEntity> products = results.getContent();

		List<CategoryBoundary> boundary = new ArrayList<>();

		products.forEach((p) -> {
			boundary.add(this.categoryConverter.toBoundary(p));
		});

		return boundary;
	}

}
