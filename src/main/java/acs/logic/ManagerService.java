package acs.logic;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.ManagerBoundary;
import acs.boundaries.UserBoundary;
import acs.dal.ManagerDao;
import acs.dal.UserDao;
import acs.data.convertor.ManagerConverter;
import acs.data.convertor.UserConverter;
import acs.data.entity.ManagerEntity;
import acs.data.entity.UserEntity;

@Service
public class ManagerService {

	@Autowired
	private UserServiceWithDB userService;
	@Autowired
	private ManagerConverter managerConverter;
	@Autowired
	private UserConverter userConverter;

	@Autowired
	private ManagerDao managerDao;

	@Autowired
	private UserDao usersDao;

	@Transactional(readOnly = true)
	public ManagerBoundary login(String email) {

		Optional<ManagerEntity> userEntity = this.managerDao.findById(email);
		if (userEntity.isPresent()) {
			return this.managerConverter.convertFromEntity(userEntity.get());
		} else {
			throw new UserNotFoundException("User is not a manager :" + email);
		}
	}

	@Transactional
	public ManagerBoundary createManager(ManagerBoundary newUser) {

		UserBoundary userBoundary = this.userService.login(newUser.getEmail());

		Optional<ManagerEntity> managerEntity = this.managerDao.findById(userBoundary.getEmail());

		if (!managerEntity.isPresent()) {

			ManagerEntity manager = new ManagerEntity();
			UserEntity userEntity = this.usersDao.findById(newUser.getEmail()).get();
			manager.setEmail(userEntity.getEmail());
			manager.setUser(userEntity);

			this.managerDao.save(manager);

			return this.managerConverter.convertFromEntity(manager);

		} else {
			throw new UserNotFoundException("this user is already a maanger!");
		}

	}

}
