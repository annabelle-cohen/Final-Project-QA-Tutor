package acs.data.convertor;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import acs.boundaries.ProductBoundary;
import acs.boundaries.ViewedListBoundary;
import acs.data.entity.ProductEntity;
import acs.data.entity.ViewedListEntity;

@Component
public class ViewedListConverter {

	@Autowired
	private ProductConverter productConverter;

	public ViewedListConverter() {
	}

	public ViewedListBoundary toBounudary(ViewedListEntity e) {

		ViewedListBoundary b = new ViewedListBoundary();
		b.setViewedListID(e.getViewedListID());

		List<ProductBoundary> products = new ArrayList<ProductBoundary>();

		for (ProductEntity p : e.getProducts()) {

			products.add(productConverter.toBoundary(p));
		}

		b.setProducts(products);

		return b;
	}

}
