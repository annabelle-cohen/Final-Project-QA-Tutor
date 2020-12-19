package acs.boundaries;

public class ImageBoundary {
	private Long imageID;
	private String source;

	public ImageBoundary(Long imageID, String source) {
		super();
		this.imageID = imageID;
		this.source = source;
	}

	public ImageBoundary() {

	}

	public Long getImageID() {
		return imageID;
	}

	public void setImageID(Long imageID) {
		this.imageID = imageID;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

}
