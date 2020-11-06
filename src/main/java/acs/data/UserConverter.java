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
		userBound.setAvatar(entity.getAvatar());
		userBound.setEmail(entity.getEmail());
		userBound.setRoleEnum(entity.getRoleEnum());
		if (entity.getUsername() != null) {
			userBound.setUserName(entity.getUsername().getFirstName() + " " + entity.getUsername().getLastName());
		} else {
			userBound.setUserName(null);
		}

		return userBound;
	}

	public UserEntity convertToEntity(UserBoundary boundary) {
		UserEntity userEntity = new UserEntity();
		userEntity.setAvatar(boundary.getAvatar());
		if (boundary.getEmail() != null) {
			userEntity.setEmail(boundary.getEmail());
		} else {
			throw new UserNotFoundException("Colud not create user for null e-mail");
		}
		if (boundary.getRoleEnum() != null) {
			userEntity.setRoleEnum(boundary.getRoleEnum());
		} else {
			throw new UserNotFoundException("Could not create user for null role");
		}
		if (boundary.getUsername() != null) {
			String[] arr = boundary.getUsername().split(" ");
			if (arr.length != 0) {

				if (arr.length == 2) {
					userEntity.setUsername(new UserName(arr[0], arr[arr.length - 1]));
				} else if (arr.length > 2) {
					StringBuilder firstName = new StringBuilder();
					for (int i = 0; i < arr.length - 1; i++) {
						
						firstName.append(arr[i] + " ");

					}
					userEntity.setUsername(new UserName(String.valueOf(firstName), arr[arr.length - 1]));
				} else {
					userEntity.setUsername(new UserName(arr[0], ""));
				}
			} else {
				throw new IllegalArgumentException("User Name Must have at least one letter!");
			}
		} else {

		}
		return userEntity;
	}
}
