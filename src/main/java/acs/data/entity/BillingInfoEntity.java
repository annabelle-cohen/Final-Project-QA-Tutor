package acs.data.entity;

import java.util.Date;

import javax.persistence.*;

@Entity
@Table(name = "BillingInfo")
public class BillingInfoEntity {

	@Id
	@GeneratedValue
	private Long billingInfoID;
	private String billingAdress;
	private String creditCardEXPDate;
	private String creditCardPIN;
	private String creditCardNo;

	@ManyToOne(fetch = FetchType.LAZY)
	private PersonalInfoEntity personalInfo;

	public Long getBillingInfoID() {
		return billingInfoID;
	}

	public void setBillingInfoID(Long billingInfoID) {
		this.billingInfoID = billingInfoID;
	}

	public String getBillingAdress() {
		return billingAdress;
	}

	public void setBillingAdress(String billingAdress) {
		this.billingAdress = billingAdress;
	}

	public String getCreditCardEXPDate() {
		return creditCardEXPDate;
	}

	public void setCreditCardEXPDate(String creditCardEXPDate) {
		this.creditCardEXPDate = creditCardEXPDate;
	}

	public String getCreditCardPIN() {
		return creditCardPIN;
	}

	public void setCreditCardPIN(String creditCardPIN) {
		this.creditCardPIN = creditCardPIN;
	}

	public String getCreditCardNo() {
		return creditCardNo;
	}

	public void setCreditCardNo(String creditCardNo) {
		this.creditCardNo = creditCardNo;
	}

	public PersonalInfoEntity getPersonalInfo() {
		return personalInfo;
	}

	public void setPersonalInfo(PersonalInfoEntity personalInfo) {
		this.personalInfo = personalInfo;
	}

}
