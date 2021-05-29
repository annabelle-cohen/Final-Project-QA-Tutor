package acs.logic;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.PasswordBoundary;
import acs.boundaries.PersonalInfoBoundary;
import acs.boundaries.UserBoundary;
import acs.boundaries.UserType;
import acs.dal.AdminDao;
import acs.dal.ManagerDao;
import acs.dal.PersonalInfoDao;
import acs.dal.StudentDao;
import acs.dal.UserDao;
import acs.data.convertor.PersonalInfoConverter;
import acs.data.convertor.UserConverter;
import acs.data.entity.AdminEntity;
import acs.data.entity.BillingInfoEntity;
import acs.data.entity.ManagerEntity;
import acs.data.entity.PersonalInfoEntity;
import acs.data.entity.StudentEntity;
import acs.data.entity.UserEntity;
import net.andreinc.mockneat.MockNeat;

@Service
public class UserServiceWithDB implements EnhanceUserService {
	private UserDao usersDao;
	private PersonalInfoDao personalInfoDao;
	private AdminDao adminDao;

	@Autowired
	private WatchListService watchListService;

	@Autowired
	private SearchListService searchListService;

	@Autowired
	private ViewedListService viewedListService;

	private UserConverter entityConverter;
	private PersonalInfoConverter infoConverter;

	public UserServiceWithDB(UserDao userDao) {
		this.usersDao = userDao;
	}

	@Autowired
	public void setPersonalInfoDao(PersonalInfoDao personalInfoDao) {
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

	@Autowired
	private CartService cartService;

	@Autowired
	private StudentDao studentDao;

	@Autowired
	private ManagerDao managerDao;

	
	@Transactional(readOnly = true)
	private UserType getUserType(String email ) {
		UserType userType = UserType.NORMAL;

		Optional<ManagerEntity> managerEntity = this.managerDao.findById(email);
		if (managerEntity.isPresent()) {
			userType = UserType.MANAGER;

		} else {
			Optional<StudentEntity> studentEntity = this.studentDao.findById(email);
			if (studentEntity.isPresent()) {
				userType = UserType.STUDENT;

			}
		}
		return userType ; 
	}
	
	@Override
	@Transactional(readOnly = true)
	public UserBoundary login(String email) {
		Optional<UserEntity> userEntity = this.usersDao.findById(email);
		if (userEntity.isPresent()) {

			UserType userType = this.getUserType(email); 

			return this.entityConverter.convertFromEntity(userEntity.get(), userType);
		} else {
			throw new UserNotFoundException("Could not find user message for " + email);
		}
	}

	private BillingInfoEntity createBillingInfo() {
		BillingInfoEntity b = new BillingInfoEntity();
		MockNeat mock = MockNeat.threadLocal();

		b.setBillingAdress("");

		String cvv = mock.cvvs().get();
		String amex = mock.creditCards().get();

		b.setCreditCardPIN(cvv);
		b.setCreditCardNo(amex);

		long aDay = TimeUnit.DAYS.toMillis(1);
		long now = new Date().getTime();
		Date tenYears = new Date(now + aDay * 365 * 10);
		Date twoYears = new Date(now + aDay * 365 * 2);
		Date creditCardEXPDate = Helper.between(twoYears, tenYears);

		Calendar cal = Calendar.getInstance();
		cal.setTime(creditCardEXPDate);
		int month = cal.get(Calendar.MONTH);
		int year = cal.get(Calendar.YEAR);
		String d = month + "/" + year;

		b.setCreditCardEXPDate(d);

		return b;
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

			if (newUser.getPassword() == null) {
				throw new UserNotFoundException("password can't be null");
			}

			UserEntity entity = this.entityConverter.convertToEntity(newUser);

			PersonalInfoEntity info = new PersonalInfoEntity();
			info.setLastName(newUser.getLastName());
			info.setFirstName(newUser.getFirstName());
			info.setUser(entity);

			info.addBillingInfo(this.createBillingInfo());
			entity.setPersonalInfo(info);

			// save them to database
			info = this.personalInfoDao.save(info);
			entity = this.usersDao.save(entity);

			// add cart
			this.cartService.createCart(entity.getEmail());
			// add watchList
			this.watchListService.createWatchList(entity.getEmail());
			// add viewedList
			this.viewedListService.createViewedList(entity.getEmail());
			// add searchList
			this.searchListService.createSearchList(entity.getEmail());

			this.usersDao.save(entity);

			String content = "<h1> Thank you </h1> <p> you're all set ! , now you can start browsing the site and start the bug hunt. </p> <footer> QA Tutor team . </footer>";
			String subject = "Welcome to QA Tutor";
			Helper.sendMsg(entity.getEmail(), subject, content);

			return this.entityConverter.convertFromEntity(entity, UserType.NORMAL);
		} else {
			throw new UserNotFoundException("this e-mail address is already exist in the system!");
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
	public PersonalInfoBoundary updateUserDetails(String email, PersonalInfoBoundary update) {

		Optional<UserEntity> user = this.usersDao.findById(email);

		if (user.isPresent()) {

			UserEntity usr = user.get();
			PersonalInfoEntity existing = usr.getPersonalInfo();

			if (update.getFirstName() != null) {
				existing.setFirstName(update.getFirstName());
			}

			if (update.getLastName() != null) {
				existing.setLastName(update.getLastName());
			}

			if (update.getAddress() != null) {
				existing.setAddress(update.getAddress());
			}

			if (update.getAvatar() != null) {
				existing.setAvatar(update.getAvatar());
			}

			if (update.getCity() != null) {
				existing.setCity(update.getCity());
			}
			if (update.getCountry() != null) {
				existing.setCountry(update.getCountry());
			}
			if (update.getPhone() != null) {
				existing.setPhone(update.getPhone());
			}

			if (update.getBillingInfos() != null) {

				PersonalInfoEntity newEntity = this.infoConverter.convertToEntity(update);
				existing.getBillingInfos().clear();
				for (BillingInfoEntity billingInfo : newEntity.getBillingInfos()) {
					existing.addBillingInfo(billingInfo);
				}
			}

			this.personalInfoDao.save(existing);

			return this.infoConverter.convertFromEntity(existing);

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
				UserType userType = this.getUserType(adminEmail) ; 
				rv.add(this.entityConverter.convertFromEntity(user ,userType));
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

			return new ArrayList<UserBoundary>(); // this.usersDao.findAll(PageRequest.of(page, size, Direction.ASC,
													// "email")).getContent()
			// .stream().map(this.entityConverter::convertFromEntity).collect(Collectors.toList());
		} else {
			throw new UserNotFoundException("Could not export all users for " + email);
		}

	}

	@Transactional
	public Boolean verify(String email) {
		Optional<UserEntity> userEntity = this.usersDao.findById(email);
		if (userEntity.isPresent()) {
			return true;
		} else {
			throw new UserNotFoundException("Could not find user message for " + email);
		}
	}

	@Transactional
	public UserBoundary updateUserPassword(String email, PasswordBoundary input) {

		Optional<UserEntity> user = this.usersDao.findById(email);

		if (user.isPresent()) {

			UserEntity usr = user.get();

			if (Helper.isDefined(input.getPassword())) {
				usr.setPassword(input.getPassword());
			} else {
				throw new UserNotFoundException("Password is invalid:" + input.getPassword());
			}

			this.usersDao.save(usr);
			UserType userType = this.getUserType(email) ; 
			
			return this.entityConverter.convertFromEntity(usr,userType);

		} else {
			throw new UserNotFoundException("User not found: " + email);
		}

	}

}
