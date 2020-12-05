package acs.boundaries;

public class BusinessBoundary {

	private String email ; 
	private String password;  
	private String businessName ;
	public BusinessBoundary(String email, String password, String businessName) {
		super();
		this.email = email;
		this.password = password;
		this.businessName = businessName;
	}
	public BusinessBoundary() {
		// TODO Auto-generated constructor stub
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getBusinessName() {
		return businessName;
	}
	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	} 
	
}
