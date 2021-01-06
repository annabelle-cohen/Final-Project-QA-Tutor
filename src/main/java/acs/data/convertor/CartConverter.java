package acs.data.convertor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import acs.boundaries.CartBoundary;
import acs.boundaries.ProductBoundary;
import acs.data.entity.CartEntity;
import acs.data.entity.ProductEntity;

@Component
public class CartConverter {

	@Autowired
	private ProductConverter productConverter;

	public CartConverter() {
	}

	public CartBoundary toBounudary(CartEntity e) {

		CartBoundary b = new CartBoundary();
		b.setCartID(e.getCartID());
		b.setTotalPrice(e.getTotalPrice());

		List<ProductBoundary> products = new ArrayList<ProductBoundary>();

		for (ProductEntity p : e.getProducts()) {

			products.add(productConverter.toBoundary(p));
		}

		b.setProducts(products);

		return b;
	}

}
