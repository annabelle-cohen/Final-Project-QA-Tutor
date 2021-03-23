package acs.boundaries;

import java.util.Date;

public class BillingInfoBoundary {

	private String billingAdress;

	private Date creditCardEXPDate;
	private String creditCardPIN;
	private String creditCardNo;

	public BillingInfoBoundary(String billingAdress, String creditCardID, Date billDate, Date creditCardEXPDate,
			String creditCardPIN, String creditCardNo) {
		super();
		this.billingAdress = billingAdress;
		this.creditCardEXPDate = creditCardEXPDate;
		this.creditCardPIN = creditCardPIN;
		this.creditCardNo = creditCardNo;

	}

	public BillingInfoBoundary() {
	}

	public String getBillingAdress() {
		return billingAdress;
	}

	public void setBillingAdress(String billingAdress) {
		this.billingAdress = billingAdress;
	}

	public Date getCreditCardEXPDate() {
		return creditCardEXPDate;
	}

	public void setCreditCardEXPDate(Date creditCardEXPDate) {
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

}
