package acs.boundaries;

import java.util.ArrayList;

import java.util.List;

public class WatchListBoundary {

	private Long WatchListID;
	private List<ProductBoundary> products = new ArrayList<ProductBoundary>();

	public Long getWatchListID() {
		return WatchListID;
	}

	public void setWatchListID(Long watchListID) {
		WatchListID = watchListID;
	}

	public List<ProductBoundary> getProducts() {
		return products;
	}

	public void setProducts(List<ProductBoundary> products2) {
		this.products = products2;
	}

}
