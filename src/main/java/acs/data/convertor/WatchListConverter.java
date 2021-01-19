
package acs.data.convertor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import acs.boundaries.ProductBoundary;
import acs.boundaries.WatchListBoundary;

import acs.data.entity.ProductEntity;
import acs.data.entity.WatchListEntity;

@Component
public class WatchListConverter {

	@Autowired
	private ProductConverter productConverter;

	public WatchListConverter() {
	}

	public WatchListBoundary toBounudary(WatchListEntity e) {

		WatchListBoundary b = new WatchListBoundary();
		b.setWatchListID(e.getWatchListID());

		List<ProductBoundary> products = new ArrayList<ProductBoundary>();

		for (ProductEntity p : e.getProducts()) {

			products.add(productConverter.toBoundary(p));
		}

		b.setProducts(products);

		return b;
	}

}
