package acs.boundaries;

import java.util.ArrayList;
import java.util.List;

public class PersonalInfoBoundary {
	private String address ;
	private String country ; 
	private String city ; 
	private String phone ; 
	private String avatar ; 
	private String firstName ;
	private String lastName ; 
	
	private List<BillingInfoBoundary>  billingInfos = new ArrayList<>();
	
	
	public PersonalInfoBoundary(){
		
	}
	


	public PersonalInfoBoundary(String address, String country, String city, String phone, String avatar,
			String firstName, String lastName, List<BillingInfoBoundary> billingInfos) {
		super();
		this.address = address;
		this.country = country;
		this.city = city;
		this.phone = phone;
		this.avatar = avatar;
		this.firstName = firstName;
		this.lastName = lastName;
		this.billingInfos = billingInfos;
	}



	public String getAddress() {
		return this.address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public List<BillingInfoBoundary> getBillingInfos() {
		return billingInfos;
	}

	public void setBillingInfos(List<BillingInfoBoundary> billingInfos) {
		this.billingInfos = billingInfos;
	}
	
	
	
}
