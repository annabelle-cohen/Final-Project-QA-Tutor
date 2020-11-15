package acs.data;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Component;

import acs.boundaries.UserBoundary;
import acs.logic.UserNotFoundException;

@Component
public class UserConverter {

	@PostConstruct
	public void setUp() {

	}

	public UserBoundary convertFromEntity(UserEntity entity) {
		UserBoundary userBound = new UserBoundary();
		userBound.setEmail(entity.getEmail());
		userBound.setPassword(entity.getPassword());
		userBound.setFirstName(entity.getPersonalInfo().getFirstName());
		userBound.setLastName(entity.getPersonalInfo().getLastName());
		return userBound;
	}

	public UserEntity convertToEntity(UserBoundary boundary) {
		UserEntity userEntity = new UserEntity();
		userEntity.setEmail(boundary.getEmail());
		userEntity.setPassword(boundary.getPassword());
		return userEntity;
	}
}
