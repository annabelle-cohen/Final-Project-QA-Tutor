package acs.boundaries;

import java.util.ArrayList;

import java.util.List;

public class SearchListBoundary {

	private Long searchListID;
	private List<String> searches = new ArrayList<String>();
	
	public Long getSearchListID() {
		return searchListID;
	}
	public void setSearchListID(Long searchListID) {
		this.searchListID = searchListID;
	}
	public List<String> getSearches() {
		return searches;
	}
	public void setSearches(List<String> searches) {
		this.searches = searches;
	}

	

	

}
