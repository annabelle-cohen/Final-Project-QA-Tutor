package acs.data.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "SearchList")
public class SearchListEntity {

	@Id
	@GeneratedValue
	private Long searchListID;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_email")
	private UserEntity user;

	@ElementCollection(targetClass = String.class)
	private Set<String> searches = new HashSet<String>();

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public void addSearchText(String keyword) {
		this.searches.add(keyword);
	}

	public Set<String> getSearches() {
		return searches;
	}

	public void setSearches(Set<String> searches) {
		this.searches = searches;
	}

	public Long getSearchListID() {
		return searchListID;
	}

	public void setSearchListID(Long searchListID) {
		this.searchListID = searchListID;
	}

}
