
package acs.boundaries;

import java.util.ArrayList;

import java.util.List;

public class ViewedListBoundary {

	private Long viewedListID;
	private List<ProductBoundary> products = new ArrayList<ProductBoundary>();

	public Long getViewedListID() {
		return viewedListID;
	}

	public void setViewedListID(Long viewedListID) {
		this.viewedListID = viewedListID;
	}

	public List<ProductBoundary> getProducts() {
		return products;
	}

	public void setProducts(List<ProductBoundary> products2) {
		this.products = products2;
	}

}
