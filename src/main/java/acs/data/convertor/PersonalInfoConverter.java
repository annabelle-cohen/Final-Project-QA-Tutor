package acs.data.convertor;


import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import acs.boundaries.BillingInfoBoundary;
import acs.boundaries.PersonalInfoBoundary;
import acs.data.entity.BillingInfoEntity;
import acs.data.entity.PersonalInfoEntity;


@Component
public class PersonalInfoConverter {

		@PostConstruct
		public void setUp() {

		}

		private BillingInfoBoundary convertFromEntity(BillingInfoEntity entity ) {
			BillingInfoBoundary infoBound = new BillingInfoBoundary();
			
			
			infoBound.setBillDate(entity.getBillDate());
			infoBound.setBillingAdress(entity.getBillingAdress());
			infoBound.setCreditCardEXPDate(entity.getCreditCardEXPDate());
			infoBound.setCreditCardID(entity.getCreditCardID());
			infoBound.setCreditCardNo(entity.getCreditCardNo());
			infoBound.setCreditCardPIN(entity.getCreditCardPIN());
				
			return infoBound  ;
		}
		
		private BillingInfoEntity convertToEntity(BillingInfoBoundary bound ) {
			BillingInfoEntity entity = new BillingInfoEntity();
		
			entity.setBillDate(bound.getBillDate());
			entity.setBillingAdress(bound.getBillingAdress());
			entity.setCreditCardEXPDate(bound.getCreditCardEXPDate());
			entity.setCreditCardID(bound.getCreditCardID());
			entity.setCreditCardNo(bound.getCreditCardNo());
			entity.setCreditCardPIN(bound.getCreditCardPIN());
				
			return entity  ;
		}
		
		
		
		public PersonalInfoBoundary convertFromEntity(PersonalInfoEntity entity) {
			PersonalInfoBoundary infoBound = new PersonalInfoBoundary();
		
				infoBound.setAddress(entity.getAddress());
				infoBound.setAvatar(entity.getAvatar());
				infoBound.setCity(entity.getCity());
				infoBound.setCountry(entity.getCity());
				infoBound.setPhone(entity.getPhone());
				infoBound.setFirstName(entity.getFirstName());
				infoBound.setLastName(entity.getLastName());
				
				List<BillingInfoBoundary> bills  = new ArrayList<BillingInfoBoundary>();
				
				for (BillingInfoEntity bill : entity.getBillingInfos() ) {
					bills.add(this.convertFromEntity(bill));
				}
				
				infoBound.setBillingInfos(bills);
			return infoBound;
		}
		
	
		

		public PersonalInfoEntity convertToEntity(PersonalInfoBoundary boundary) {
			PersonalInfoEntity entity = new PersonalInfoEntity();
			
			entity.setAddress(boundary.getAddress());
			entity.setAvatar(boundary.getAvatar());
			entity.setCity(boundary.getCity());
			entity.setCountry(boundary.getCity());
			entity.setPhone(boundary.getPhone());
			entity.setFirstName(boundary.getFirstName());
			entity.setLastName(boundary.getLastName());
			
			
			List<BillingInfoEntity> bills  = new ArrayList<BillingInfoEntity>();
			
			for (BillingInfoBoundary bill : boundary.getBillingInfos() ) {
				bills.add(this.convertToEntity(bill));
			}
			
			entity.setBillingInfos(bills);
			
			return entity;
		}
	

}
