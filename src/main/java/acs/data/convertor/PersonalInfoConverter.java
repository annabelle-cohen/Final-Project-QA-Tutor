package acs.data.convertor;


import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import acs.boundaries.PersonalInfoBoundary;

import acs.data.entity.PersonalInfoEntity;


@Component
public class PersonalInfoConverter {

		@PostConstruct
		public void setUp() {

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
			return entity;
		}
	

}
