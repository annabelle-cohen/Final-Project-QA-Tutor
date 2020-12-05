package acs.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.BusinessBoundary;

import acs.dal.BusinessDao;

import acs.data.convertor.BusinessConverter;

import acs.data.entity.BusinessEntity;


@Service 
public class BusinessService {

	private BusinessDao businessDao;
	private BusinessConverter entityConverter;
	
	@Autowired
	public void setBusinessDao( BusinessDao businessDao) {
		this.businessDao = businessDao;
	}
	
	@Autowired
	public void setEntityConverter(BusinessConverter entityConverter) {
		this.entityConverter = entityConverter;
	}

	
	@Transactional(readOnly = true)
	public BusinessBoundary login(String email) {
		List<BusinessEntity> results = this.businessDao.findByBusinessEmail(email);
		
		if (results.isEmpty()){
			throw new UserNotFoundException("Could not find business for " + email);		
		} 
		
		BusinessEntity b = results.get(0);
			return this.entityConverter.convertFromEntity(b);
		
	}
	
	static boolean isValidEmail(String email) {
		String emailFormat = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
		return email.matches(emailFormat);
	}

	
	
	@Transactional
	public BusinessBoundary createBusiness(BusinessBoundary newBusiness) {

		List<BusinessEntity> results  = this.businessDao.findByBusinessEmail(newBusiness.getEmail());
		if (results.isEmpty()) {
			if (!isValidEmail(newBusiness.getEmail())) {
				throw new IllegalArgumentException("invalid email address " + newBusiness.getEmail());
			}

			
			if ( !Helper.isDefined(newBusiness.getBusinessName())) {
				throw new UserNotFoundException("Business name can't be empty");
			}
			
			if ( !Helper.isDefined(newBusiness.getPassword())) {
				throw new UserNotFoundException("password can't be empty");
			}
			
			BusinessEntity entity = this.entityConverter.convertToEntity(newBusiness);
			
			
			//save them to database
			entity = this.businessDao.save(entity);
			//
			
			return this.entityConverter.convertFromEntity(entity);
		} else {
			throw new UserNotFoundException("this e-mail adress is already exist in the system!");
		}
	}


	
}
