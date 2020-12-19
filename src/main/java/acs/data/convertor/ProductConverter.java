package acs.data.convertor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import acs.boundaries.CategoryBoundary;
import acs.boundaries.ImageBoundary;
import acs.boundaries.ProductBoundary;
import acs.data.entity.CategoryEntity;
import acs.data.entity.ImageEntity;
import acs.data.entity.ProductEntity;


@Component
public class ProductConverter {

	@Autowired
	private CategoryConverter categoryConverter;
	@Autowired
	private ImageConverter imageConverter;

	public ProductConverter() {

	//	this.categoryConverter = new CategoryConverter();
		//this.imageConverter = new ImageConverter();

	}

	public ProductBoundary toBoundary(ProductEntity e) {

		ProductBoundary b = new ProductBoundary();

		// category
		List<CategoryEntity> cats = e.getCategories();
		List<CategoryBoundary> newCats = new ArrayList<>();
		for (CategoryEntity cat : cats) {
			newCats.add(this.categoryConverter.toBoundary(cat));
		}
		b.setCategories(newCats);

		// images
		List<ImageEntity> images = e.getImages();
		List<ImageBoundary> newImages = new ArrayList<>();
		for (ImageEntity img : images) {
			newImages.add(this.imageConverter.toBoundary(img));
		}
		b.setImages(newImages);

		b.setLocation(e.getLocation());
		b.setProductCondition(e.getProductCondition());
		b.setProductDescription(e.getProductDescription());
		b.setProductID(e.getProductID());
		b.setShippingServiceCost(e.getShippingServiceCost());
		b.setSubtitle(e.getSubtitle());

		// TODO
		// b.setSupplier(supplier);

		b.setTitle(e.getTitle());
		b.setUnitPrice(e.getUnitPrice());
		b.setUnitsInStock(e.getUnitsInStock());
		b.setUnitsOnOrder(e.getUnitsOnOrder());

		return b;
	}

}
