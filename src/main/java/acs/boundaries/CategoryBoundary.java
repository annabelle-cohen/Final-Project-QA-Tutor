package acs.boundaries;

public class CategoryBoundary {
	private Long categoryID;
	private String catgeroyName;
	private String description;
	private String thumbnail;

	public CategoryBoundary() {
	}

	public CategoryBoundary(Long categoryID, String catgeroyName, String description, String thumbnail) {
		super();
		this.categoryID = categoryID;
		this.catgeroyName = catgeroyName;
		this.description = description;
		this.thumbnail = thumbnail;
	}

	public Long getCategoryID() {
		return categoryID;
	}

	public void setCategoryID(Long categoryID) {
		this.categoryID = categoryID;
	}

	public String getCatgeroyName() {
		return catgeroyName;
	}

	public void setCatgeroyName(String catgeroyName) {
		this.catgeroyName = catgeroyName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

}
