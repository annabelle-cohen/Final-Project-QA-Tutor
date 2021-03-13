
package acs.logic;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import acs.boundaries.SearchListBoundary;
import acs.dal.SearchListDao;
import acs.dal.UserDao;
import acs.data.convertor.SearchListConverter;
import acs.data.entity.SearchListEntity;
import acs.data.entity.UserEntity;

@Service
public class SearchListService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private SearchListDao searchListDao;

	@Autowired
	private SearchListConverter searchListConverter;

	public SearchListService() {
	}

	@Transactional
	public SearchListBoundary createSearchList(String email) {

		Optional<UserEntity> results = this.userDao.findById(email);

		if (!results.isPresent()) {
			throw new RuntimeException("user doesn't exist :" + email);
		}

		UserEntity userE = results.get();

		if (userE.getSearchList() != null) {
			throw new RuntimeException("search list is already created for  :" + email);
		}

		SearchListEntity w = new SearchListEntity();

		searchListDao.save(w);

		userE.setSearchList(w);

		this.userDao.save(userE);

		return searchListConverter.toBounudary(w);

	}

	@Transactional(readOnly = true)
	public SearchListBoundary getSearchList(String email) {

		Optional<UserEntity> results = this.userDao.findById(email);

		if (!results.isPresent()) {
			throw new RuntimeException("user doesn't exist :" + email);
		}

		UserEntity user = results.get();

		if (user.getSearchList() == null) {
			throw new RuntimeException("search list doesn't exist :" + email);
		}

		SearchListBoundary b = this.searchListConverter.toBounudary(user.getSearchList());

		return b;
	}

	@Transactional
	public void clearSearchList(Long searchListID) {

		Optional<SearchListEntity> ListResult = this.searchListDao.findById(searchListID);

		if (!ListResult.isPresent()) {
			throw new RuntimeException("watchList doesn't exist :" + searchListID);
		}

		SearchListEntity searchList = ListResult.get();

		searchList.getSearches().clear();

		this.searchListDao.save(searchList);

	}

	@Transactional
	public void addSearchToSearchList(String search, Long searchListID) {

		Optional<SearchListEntity> searchResult = this.searchListDao.findById(searchListID);

		if (!searchResult.isPresent()) {
			throw new RuntimeException("search list doesn't exist :" + searchListID);
		}

		if (search == null || search.isEmpty()) {
			return;
		}

		SearchListEntity searchlist = searchResult.get();

		searchlist.addSearchText(search);

		this.searchListDao.save(searchlist);

	}

	@Transactional
	public void removeSearchFromSearchList(String searchText, Long searchListID) {

		Optional<SearchListEntity> searchResult = this.searchListDao.findById(searchListID);

		if (!searchResult.isPresent()) {
			throw new RuntimeException("search list doesn't exist :" + searchListID);
		}

		if (searchText == null) {
			throw new RuntimeException("searchText is null" + searchListID);
		}

		SearchListEntity searchlist = searchResult.get();

		searchlist.getSearches().remove(searchText);

		this.searchListDao.save(searchlist);
	}
}
