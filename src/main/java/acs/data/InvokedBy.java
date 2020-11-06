package acs.data;

import javax.persistence.Embeddable;

@Embeddable
public class InvokedBy implements ICreatorEmail {

	private String email;

	public InvokedBy(String email) {
		super();
		this.email = email;
	}

	public InvokedBy() {

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
