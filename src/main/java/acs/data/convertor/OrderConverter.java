package acs.data.convertor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import acs.boundaries.OrderBoundary;
import acs.boundaries.ProductBoundary;
import acs.data.entity.OrderEntity;
import acs.data.entity.ProductEntity;

@Component
public class OrderConverter {

	@Autowired
	private ProductConverter productConverter;

	public OrderConverter() {
	}

	public OrderBoundary toBounudary(OrderEntity e) {

		OrderBoundary b = new OrderBoundary();

		b.setOrderID(e.getOrderID());

		b.setQuantity(e.getQuantity());
		b.setTotalPrice(e.getTotalPrice());

		List<ProductBoundary> products = new ArrayList<ProductBoundary>();

		for (ProductEntity p : e.getProducts()) {

			products.add(productConverter.toBoundary(p));
		}
		b.setProducts(products);

		b.setOrderDate(e.getOrderDate());
		b.setShippedDate(e.getShippedDate());
		b.setShippedVia(e.getShippedVia());
		b.setShipper(e.getShipper());
		return b;
	}

}
