package acs.data;

import javax.persistence.*;
import java.io.Serializable;
@Entity
public class PersonalInfoEntity implements Serializable {
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private String personalID; 
	private String Address ;
	private String country ; 
	private String city ; 
	private String phone ; 
	private String avatar ; 
	private String BillingID;
	private String firstName ; 
	private String lastName ;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_email", referencedColumnName = "email", foreignKey=@ForeignKey(name = "fk_personalInfo_email"))
    private UserEntity user;
	
	public String getPersonalID() {
		return personalID;
	}

	public void setPersonalID(String personalID) {
		this.personalID = personalID;
	}

	public String getAddress() {
		return Address;
	}

	public void setAddress(String address) {
		Address = address;
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

	public String getBillingID() {
		return BillingID;
	}

	public void setBillingID(String billingID) {
		BillingID = billingID;
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

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}


}
