package acs.data.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
//import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "Business")
public class BusinessEntity {
	@Id
	@GeneratedValue
	private Long businessID ; 
	private String businessName ;
	private String businessEmail; 
	private String businessPassword;
	public Long getBusinessID() {
		return businessID;
	}
	public void setBusinessID(Long businessID) {
		this.businessID = businessID;
	}
	
	public String getBusinessEmail() {
		return businessEmail;
	}
	public void setBusinessEmail(String businessEmail) {
		this.businessEmail = businessEmail;
	}
	public String getBusinessPassword() {
		return businessPassword;
	}
	public void setBusinessPassword(String businessPassword) {
		this.businessPassword = businessPassword;
	}
	public String getBusinessName() {
		return businessName;
	}
	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}
	
	//@OneToOne(mappedBy = "user")
	//private PersonalInfoEntity businessInfo; 
}
