//package acs.logic;
//
//import java.util.Collections;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//import javax.annotation.PostConstruct;
//import org.springframework.beans.factory.annotation.Autowired;
//import acs.boundaries.UserBoundary;
//import acs.data.UserConverter;
//import acs.data.UserEntity;
//
////@Service
//public class UserServiceMockup implements UserService {
//
//	private Map<String, UserEntity> database;
//	private UserConverter entityConverter;
//
//	@Autowired
//	public void setEntityConverter(UserConverter entityConverter) {
//		this.entityConverter = entityConverter;
//	}
//
//	@PostConstruct
//	public void init() {
//		this.database = Collections.synchronizedMap(new HashMap<>());
//	}
//
//	@Override
//	public UserBoundary login(String email) {
//		if (email != null && this.database.containsKey(email)) {
//			UserEntity userEntity = this.database.get(email);
//			return this.entityConverter.convertFromEntity(userEntity);
//		} else {
//			throw new UserNotFoundException("could not find message for email: " + email);
//		}
//	}
//
//	@Override
//	public UserBoundary createUser(UserBoundary newUser) {
//		UserEntity entity = this.entityConverter.convertToEntity(newUser);
//
//		if (newUser.getEmail() != null && !this.database.containsKey(entity.getEmail())) {
//			entity.setEmail(newUser.getEmail());
//			this.database.put(entity.getEmail(), entity);
//			return this.entityConverter.convertFromEntity(entity);
//		} else {
//			throw new UserNotFoundException("could not create user for email:" + newUser.getEmail());
//		}
//
//	}
//
//	@Override
//	public UserBoundary updateUserDetails(String email, UserBoundary update) {
//		if (this.database.containsKey(email)) {
//			UserEntity entity = this.database.get(email);
//			UserBoundary existing;
//			boolean dirty = false;
//			if (entity != null) {
//				existing = this.entityConverter.convertFromEntity(entity);
//			} else {
//				throw new UserNotFoundException("could not find message for email: " + email);
//			}
//
//		//	if (update.getUsername() != null) {
//		//		existing.setUsername(update.getUsername());
//		//		dirty = true;
//	//		}
//
//			if (update.getAvatar() != null) {
//				existing.setAvatar(update.getAvatar());
//				dirty = true;
//			}
//
//			if (update.getRoleEnum() != null) {
//				existing.setRoleEnum(update.getRoleEnum());
//				dirty = true;
//			}
//
//			if (dirty) {
//				this.database.put(existing.getEmail(), this.entityConverter.convertToEntity(existing));
//			}
//
//			return existing;
//		} else {
//			throw new UserNotFoundException("could not update message for email: " + email);
//		}
//	}
//
//	@Override
//	public List<UserBoundary> exportAllUsers(String adminEmail) {
//	
//			return this.database.values().stream().map(entity -> this.entityConverter.convertFromEntity(entity))
//					.collect(Collectors.toList());
//	
//	}
//
//	@Override
//	public void deleteAllUseres(String adminEmail) {
//
//			this.database.clear();
//
//
//	}
//
//}
