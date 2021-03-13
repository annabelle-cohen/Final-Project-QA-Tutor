
package acs.data.convertor;

import java.util.ArrayList;
import org.springframework.stereotype.Component;
import acs.boundaries.SearchListBoundary;
import acs.data.entity.SearchListEntity;

@Component
public class SearchListConverter {

	public SearchListConverter() {
	}

	public SearchListBoundary toBounudary(SearchListEntity e) {

		SearchListBoundary b = new SearchListBoundary();
		b.setSearchListID(e.getSearchListID());

		b.setSearches(new ArrayList<String>(e.getSearches()));

		return b;
	}

}
