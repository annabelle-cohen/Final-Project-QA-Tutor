package acs.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import acs.boundaries.UserBoundary;
import acs.dal.UserDao;
import acs.data.UserConverter;
import acs.data.UserEntity;
import acs.data.UserRole;

@Service
public class UserServiceWithDB implements EnhanceUserService {
	private UserDao usersDao;
	private UserConverter entityConverter;

	public UserServiceWithDB(UserDao userDao) {
		this.usersDao = userDao;
	}

	@Autowired
	public void setEntityConverter(UserConverter entityConverter) {
		this.entityConverter = entityConverter;
	}

	@Override
	@Transactional(readOnly = true)
	public UserBoundary login(String email) {
		Optional<UserEntity> userEntity = this.usersDao.findById(email);
		if (userEntity.isPresent()) {
			return this.entityConverter.convertFromEntity(userEntity.get());
		} else {
			throw new UserNotFoundException("Could not find user message for " + email);
		}
	}

	@Override
	@Transactional
	public UserBoundary createUser(UserBoundary newUser) {

		Optional<UserEntity> userEntity = this.usersDao.findById(newUser.getEmail());
		if (!userEntity.isPresent()) {
			if (!isValidEmail(newUser.getEmail())) {
				throw new IllegalArgumentException("invalid email address " + newUser.getEmail());
			}

			if (!isValidAvatar(newUser.getAvatar())) {
				throw new IllegalArgumentException("invalid user avatar " + newUser.getAvatar());
			}
			
			if (newUser.getUsername() == null) {
				throw new UserNotFoundException("Could not create user for null user name!");
			}

			UserEntity entity = this.entityConverter.convertToEntity(newUser);
			entity = this.usersDao.save(entity);

			return this.entityConverter.convertFromEntity(entity);
		} else {
			throw new UserNotFoundException("this e-mail adress is already exist in the system!");
		}
	}

	@Override
	@Transactional
	public UserBoundary updateUserDetails(String email, UserBoundary update) {
		Optional<UserEntity> entity = this.usersDao.findById(email);

		if (entity.isPresent()) {
			UserBoundary existing = this.entityConverter.convertFromEntity(entity.get());

			if (update.getUsername() != null) {
				existing.setUserName(update.getUsername());
			}

			if (isValidAvatar(update.getAvatar())) {
				existing.setAvatar(update.getAvatar());

			}

			this.usersDao.save(this.entityConverter.convertToEntity(existing));

			return existing;
		} else {
			throw new UserNotFoundException("could not update message for email: " + email);
		}

	}

	@Override
	@Transactional(readOnly = true)
	public List<UserBoundary> exportAllUsers(String adminEmail) {
		Optional<UserEntity> entityAdmin = this.usersDao.findById(adminEmail);
		if (entityAdmin.isPresent()) {
			if (entityAdmin.get().getRoleEnum().equals(UserRole.ADMIN)) {
				List<UserBoundary> rv = new ArrayList<>();
				Iterable<UserEntity> allUsers = this.usersDao.findAll();
				for (UserEntity user : allUsers) {
					rv.add(this.entityConverter.convertFromEntity(user));
				}
				return rv;
			} else {
				throw new IllegalArgumentException(
						"Could not export all users for " + entityAdmin.get().getRoleEnum() + " role");
			}
		} else {
			throw new UserNotFoundException("Could not export all users for " + adminEmail);
		}

	}

	@Override
	@Transactional
	public void deleteAllUseres(String adminEmail) {
		Optional<UserEntity> entityAdmin = this.usersDao.findById(adminEmail);
		if (entityAdmin.isPresent()) {
			if (entityAdmin.get().getRoleEnum().equals(UserRole.ADMIN)) {
				this.usersDao.deleteAll();
			} else {

				throw new IllegalArgumentException("Could not delete for " + entityAdmin.get().getRoleEnum() + " role");
			}
		} else {
			throw new UserNotFoundException("Could not delete all users for " + adminEmail);
		}
	}

	static boolean isValidEmail(String email) {
		String emailFormat = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
		return email.matches(emailFormat);
	}

	static boolean isValidAvatar(String avatar) {
		if (avatar != null && !avatar.equals(""))
			return true;
		else
			return false;
	}

	@Override
	@Transactional(readOnly = true)
	public List<UserBoundary> exportAllUsers(String email, int size, int page) {
		Optional<UserEntity> entityAdmin = this.usersDao.findById(email);
		
		if (entityAdmin.isPresent()) {
		
			if (!entityAdmin.get().getRoleEnum().equals(UserRole.ADMIN)) {
				throw new UserNotFoundException("User is not an Admin, Could not export all users for " + email);	
			}
		
		return this.usersDao.findAll(PageRequest.of(page, size, Direction.ASC, "email")).getContent()
				.stream().map(this.entityConverter::convertFromEntity).collect(Collectors.toList());
		}
			else {
				throw new UserNotFoundException("Could not export all users for " + email);
			}
		
	}

}
