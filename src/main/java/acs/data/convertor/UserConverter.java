package acs.data.convertor;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import acs.boundaries.UserBoundary;
import acs.boundaries.UserType;
import acs.data.entity.UserEntity;

@Component
public class UserConverter {

	@PostConstruct
	public void setUp() {

	}

	public UserBoundary convertFromEntity(UserEntity entity, UserType userType) {
		UserBoundary userBound = new UserBoundary();
		userBound.setEmail(entity.getEmail());
		userBound.setPassword(entity.getPassword());
		userBound.setFirstName(entity.getPersonalInfo().getFirstName());
		userBound.setLastName(entity.getPersonalInfo().getLastName());
		userBound.setUserType(userType);
		return userBound;
	}

	public UserEntity convertToEntity(UserBoundary boundary) {
		UserEntity userEntity = new UserEntity();
		userEntity.setEmail(boundary.getEmail());
		userEntity.setPassword(boundary.getPassword());
		return userEntity;
	}
}
