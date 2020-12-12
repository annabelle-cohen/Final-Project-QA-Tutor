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

import acs.boundaries.PasswordBoundary;
import acs.boundaries.PersonalInfoBoundary;
import acs.boundaries.UserBoundary;
import acs.dal.AdminDao;
import acs.dal.PersonalInfoDao;
import acs.dal.UserDao;
import acs.data.UserRole;
import acs.data.convertor.PersonalInfoConverter;
import acs.data.convertor.UserConverter;
import acs.data.entity.AdminEntity;
import acs.data.entity.PersonalInfoEntity;
import acs.data.entity.UserEntity;


@Service
public class UserServiceWithDB implements EnhanceUserService {
	private UserDao usersDao;
	private PersonalInfoDao personalInfoDao;
	private AdminDao adminDao;
	private UserConverter entityConverter;
	private PersonalInfoConverter infoConverter ;
	public UserServiceWithDB(UserDao userDao) {
		this.usersDao = userDao;
	}

	@Autowired
	public void setPersonalInfoDao( PersonalInfoDao personalInfoDao) {
		this.personalInfoDao = personalInfoDao;
	}
	
	@Autowired
	public void setEntityConverter(UserConverter entityConverter) {
		this.entityConverter = entityConverter;
	}
	
	@Autowired
	public void setInfoConverter(PersonalInfoConverter infoConverter) {
		this.infoConverter = infoConverter;
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

			
			if (newUser.getFirstName() == null) {
				throw new UserNotFoundException("fist name can't be null!");
			}

			if (newUser.getLastName() == null) {
				throw new UserNotFoundException("last name can't be null");
			}
			
			if (newUser.getPassword()==null) {
				throw new UserNotFoundException("password can't be null");
			}
			
			UserEntity entity = this.entityConverter.convertToEntity(newUser);
			
			PersonalInfoEntity info = new PersonalInfoEntity();
			info.setLastName(newUser.getFirstName());
			info.setFirstName(newUser.getFirstName());
			info.setUser(entity);
			
			entity.setPersonalInfo(info);
			
			//save them to database
			info = this.personalInfoDao.save(info);
			entity = this.usersDao.save(entity);
			//
			
			return this.entityConverter.convertFromEntity(entity);
		} else {
			throw new UserNotFoundException("this e-mail adress is already exist in the system!");
		}
	}

	
	@Override
	@Transactional
	public PersonalInfoBoundary getUserDetails(String email) {
		Optional<UserEntity> userEntity = this.usersDao.findById(email);
		if (userEntity.isPresent()) {
			return this.infoConverter.convertFromEntity(userEntity.get().getPersonalInfo());
		} else {
			throw new UserNotFoundException("User not found:" + email);
		}
	}
	
	
	@Override
	@Transactional
	public PersonalInfoBoundary updateUserDetails(String email,PersonalInfoBoundary update) {
		
		Optional<UserEntity> user = this.usersDao.findById(email);
		
	
		if (user.isPresent()) {
			
				PersonalInfoBoundary existing = this.infoConverter.convertFromEntity(user.get().getPersonalInfo());
				
				if (update.getFirstName()!= null ) {
					existing.setFirstName(update.getFirstName());
				}

				if (update.getLastName()!= null) {
					existing.setLastName(update.getLastName());
				}
				
				if (update.getAddress() != null) {
					existing.setAddress(update.getAddress());
				}
				
				if (update.getAvatar()!= null) {
					existing.setAvatar(update.getAvatar());
				}
				
				if (update.getCity()!=null) {
					existing.setCity(update.getCity());
				}
				if (update.getCountry()!=null) {
					existing.setCountry(update.getCountry());
				}
				if (update.getPhone()!= null ) {
					existing.setPhone(update.getPhone());
				}

				this.personalInfoDao.save(this.infoConverter.convertToEntity(existing));

				return existing;	
			
		} else {
			throw new UserNotFoundException("User not found: " + email);
		}

	}

	@Override
	@Transactional(readOnly = true)
	public List<UserBoundary> exportAllUsers(String adminEmail) {
		Optional<AdminEntity> entityAdmin = this.adminDao.findById(adminEmail);
		if (entityAdmin.isPresent()) {
				List<UserBoundary> rv = new ArrayList<>();
				Iterable<UserEntity> allUsers = this.usersDao.findAll();
				for (UserEntity user : allUsers) {
					rv.add(this.entityConverter.convertFromEntity(user));
				}
				return rv;
			
		} else {
			throw new UserNotFoundException("Could not export all users for " + adminEmail);
		}

	}

	@Override
	@Transactional
	public void deleteAllUseres(String adminEmail) {
		Optional<AdminEntity> entityAdmin = this.adminDao.findById(adminEmail);
		if (entityAdmin.isPresent()) {
			
				this.usersDao.deleteAll();
			
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
		Optional<AdminEntity> entityAdmin = this.adminDao.findById(email);
		
		if (entityAdmin.isPresent()) {
		
		return new ArrayList<UserBoundary>(); // this.usersDao.findAll(PageRequest.of(page, size, Direction.ASC, "email")).getContent()
				//.stream().map(this.entityConverter::convertFromEntity).collect(Collectors.toList());
		}
			else {
				throw new UserNotFoundException("Could not export all users for " + email);
			}
		
	}

	
	@Transactional
	public Boolean verify(String email) {
		Optional<UserEntity> userEntity = this.usersDao.findById(email);
		if (userEntity.isPresent()) {
			return true ;
		} else {
			throw new UserNotFoundException("Could not find user message for " + email);
		}
	}
	
	
	@Transactional
	public UserBoundary updateUserPassword(String email,PasswordBoundary input) {
		
		Optional<UserEntity> user = this.usersDao.findById(email);
		
	
		if (user.isPresent()) {
			
			UserEntity	usr  = user.get();
				
				if (Helper.isDefined(input.getPassword())  ) {
					usr.setPassword(input.getPassword());
				}else {
					throw new UserNotFoundException("Password is invalid:" + input.getPassword());
				}
	
				this.usersDao.save(usr);

				return this.entityConverter.convertFromEntity(usr);	
			
		} else {
			throw new UserNotFoundException("User not found: " + email);
		}

	}

}
