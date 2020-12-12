package acs.boundaries;

import java.sql.Date;

public class BillingInfoBoundary {

	private String billingAdress ;
	private String creditCardID;
	private Date billDate ;
	private Date creditCardEXPDate;
	private String creditCardPIN;
	private String creditCardNo ;

	
	
	public BillingInfoBoundary(String billingAdress, String creditCardID, Date billDate, Date creditCardEXPDate,
			String creditCardPIN, String creditCardNo) {
		super();
		this.billingAdress = billingAdress;
		this.creditCardID = creditCardID;
		this.billDate = billDate;
		this.creditCardEXPDate = creditCardEXPDate;
		this.creditCardPIN = creditCardPIN;
		this.creditCardNo = creditCardNo;
		
	}

	public BillingInfoBoundary() {}

	public String getBillingAdress() {
		return billingAdress;
	}

	public void setBillingAdress(String billingAdress) {
		this.billingAdress = billingAdress;
	}

	public String getCreditCardID() {
		return creditCardID;
	}

	public void setCreditCardID(String creditCardID) {
		this.creditCardID = creditCardID;
	}

	public Date getBillDate() {
		return billDate;
	}

	public void setBillDate(Date billDate) {
		this.billDate = billDate;
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
