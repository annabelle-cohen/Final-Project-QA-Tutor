package acs.data.entity;


import javax.persistence.*;

@Entity
@Table(name = "Image")
public class ImageEntity {
	@Id
    @GeneratedValue
	private Long imageID;
	
	 @ManyToOne(fetch = FetchType.LAZY)
	private ProductEntity product ; 
	private String source;
	public Long getImageID() {
		return imageID;
	}
	public void setImageID(Long imageID) {
		this.imageID = imageID;
	}
	public ProductEntity getProduct() {
		return product;
	}
	public void setProduct(ProductEntity product) {
		this.product = product;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	
}
