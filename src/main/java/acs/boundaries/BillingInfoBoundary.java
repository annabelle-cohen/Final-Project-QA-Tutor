package acs.boundaries;

public class BillingInfoBoundary {

	private String billingAdress;
	private Long billingInfoID;
	private String creditCardEXPDate;
	private String creditCardPIN;
	private String creditCardNo;

	public BillingInfoBoundary() {
	}

	public Long getBillingInfoID() {
		return billingInfoID;
	}

	public void setBillingInfoID(Long billingInfoID) {
		this.billingInfoID = billingInfoID;
	}

	public String getCreditCardEXPDate() {
		return creditCardEXPDate;
	}

	public void setCreditCardEXPDate(String creditCardEXPDate) {
		this.creditCardEXPDate = creditCardEXPDate;
	}

	public String getBillingAdress() {
		return billingAdress;
	}

	public void setBillingAdress(String billingAdress) {
		this.billingAdress = billingAdress;
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
