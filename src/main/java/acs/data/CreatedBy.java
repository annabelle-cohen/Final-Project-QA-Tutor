package acs.data;

import javax.persistence.Embeddable;

@Embeddable
public class CreatedBy implements ICreatorEmail {
	private String email;
	
	
	
	public CreatedBy() {
		super();
	}
	public CreatedBy(String email) {
		super();
		this.email = email;
	}
	@Override
	public String getEmail() {
		return email;
	}
	@Override
	public void setEmail(String email) {
		this.email = email;
	}
}
