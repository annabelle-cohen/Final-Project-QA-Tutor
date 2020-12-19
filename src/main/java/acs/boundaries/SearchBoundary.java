package acs.boundaries;

public class SearchBoundary {

	private String keyword;
	private Long categoryID;
	private Integer page;
	private Integer size;

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public Long getCategoryID() {
		return categoryID;
	}

	public void setCategoryID(Long categoryID) {
		this.categoryID = categoryID;
	}

	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public SearchBoundary(String keyword, Long categoryID, Integer page, Integer size) {
		super();
		this.keyword = keyword;
		this.categoryID = categoryID;
		this.page = page;
		this.size = size;
	}

	public SearchBoundary() {
	}

}
