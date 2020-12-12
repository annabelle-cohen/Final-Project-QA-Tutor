package acs.data.convertor;

import javax.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import acs.boundaries.BusinessBoundary;
import acs.data.entity.BusinessEntity;

@Component
public class BusinessConverter {

	
	@PostConstruct
	public void setUp() {

	}

	public BusinessBoundary convertFromEntity(BusinessEntity entity) {
		BusinessBoundary b = new BusinessBoundary();
		b.setEmail(entity.getBusinessEmail());
		b.setPassword(entity.getBusinessPassword());
		b.setBusinessName(entity.getBusinessName());
		return b;
	}

	public BusinessEntity convertToEntity(BusinessBoundary boundary) {
		BusinessEntity b = new BusinessEntity();
		b.setBusinessEmail(boundary.getEmail());
		b.setBusinessPassword(boundary.getPassword());
		b.setBusinessName(boundary.getBusinessName());
		return b;
	}
	
}
