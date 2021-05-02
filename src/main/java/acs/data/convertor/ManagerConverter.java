
package acs.data.convertor;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import acs.boundaries.ManagerBoundary;
import acs.boundaries.UserBoundary;
import acs.boundaries.UserType;
import acs.data.entity.ManagerEntity;
import acs.data.entity.UserEntity;

@Component
public class ManagerConverter {

	@Autowired
	UserConverter userConverter;

	@PostConstruct
	public void setUp() {

	}

	public ManagerBoundary convertFromEntity(ManagerEntity entity) {
		ManagerBoundary managerBound = new ManagerBoundary();

		UserBoundary manager = this.userConverter.convertFromEntity(entity.getUser(), UserType.MANAGER);
		managerBound.setManager(manager);
		managerBound.setEmail(entity.getEmail());

		return managerBound;
	}

	public ManagerEntity convertToEntity(ManagerBoundary boundary) {
		ManagerEntity managerEntity = new ManagerEntity();
		UserEntity userEntity = this.userConverter.convertToEntity(boundary.getManager());

		managerEntity.setEmail(boundary.getEmail());
		managerEntity.setUser(userEntity);

		return managerEntity;
	}
}
