package acs.logic;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.AddBugBoundary;
import acs.boundaries.AddBugToStudentBoundary;
import acs.boundaries.BugBoundary;
import acs.boundaries.ManagerBoundary;
import acs.boundaries.StudentBoundary;
import acs.boundaries.UserBoundary;
import acs.dal.BugDao;
import acs.dal.ManagerDao;
import acs.dal.StudentDao;
import acs.dal.UserDao;
import acs.data.convertor.BugConverter;
import acs.data.convertor.ManagerConverter;
import acs.data.convertor.StudentConverter;
import acs.data.entity.BugEntity;
import acs.data.entity.ManagerEntity;
import acs.data.entity.StudentEntity;
import acs.data.entity.UserEntity;

@Service
public class ManagerService {

	@Autowired
	private UserServiceWithDB userService;
	@Autowired
	private ManagerConverter managerConverter;
	@Autowired
	private StudentConverter studentConverter;

	@Autowired
	private BugConverter bugConverter;

	@Autowired
	private ManagerDao managerDao;

	@Autowired
	private UserDao usersDao;

	@Autowired
	private StudentDao studentDao;

	@Autowired
	private BugDao bugDao;

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

	@Transactional
	public StudentBoundary addBugToStudent(AddBugToStudentBoundary newBug) {

		UserBoundary userBoundary = this.userService.login(newBug.getManagerEmail());

		Optional<ManagerEntity> managerEntity = this.managerDao.findById(userBoundary.getEmail());

		if (managerEntity.isPresent()) {

			Optional<BugEntity> bug = this.bugDao.findById(newBug.getBugName());

			if (!bug.isPresent()) {
				throw new UserNotFoundException("Bug doesn't exist!");
			}

			Optional<StudentEntity> student = this.studentDao.findById(newBug.getStudentEmail());
			if (!student.isPresent()) {
				throw new UserNotFoundException("Student doesn't exist!");
			}

			StudentEntity studentEntity = student.get();
			BugEntity bugEntity = bug.get();

			studentEntity.addBug(bugEntity);
			bugEntity.addStudent(studentEntity);

			this.studentDao.save(studentEntity);
			this.bugDao.save(bugEntity);

			return this.studentConverter.convertFromEntity(studentEntity);

		} else {
			throw new UserNotFoundException("this user is not a maanger!");
		}

	}
	
	@Transactional
	public StudentBoundary removeBugFromStudent(AddBugToStudentBoundary newBug) {

		UserBoundary userBoundary = this.userService.login(newBug.getManagerEmail());

		Optional<ManagerEntity> managerEntity = this.managerDao.findById(userBoundary.getEmail());

		if (managerEntity.isPresent()) {

			Optional<BugEntity> bug = this.bugDao.findById(newBug.getBugName());

			if (!bug.isPresent()) {
				throw new UserNotFoundException("Bug doesn't exist!");
			}

			Optional<StudentEntity> student = this.studentDao.findById(newBug.getStudentEmail());
			if (!student.isPresent()) {
				throw new UserNotFoundException("Student doesn't exist!");
			}

			StudentEntity studentEntity = student.get();
			BugEntity bugEntity = bug.get();

			studentEntity.removeBug(bugEntity);
			bugEntity.removeStudent(studentEntity);

			this.studentDao.save(studentEntity);
			this.bugDao.save(bugEntity);

			return this.studentConverter.convertFromEntity(studentEntity);

		} else {
			throw new UserNotFoundException("this user is not a maanger!");
		}

	}

	@Transactional
	public BugBoundary addBug(AddBugBoundary newBug) {

		UserBoundary userBoundary = this.userService.login(newBug.getManagerEmail());

		Optional<ManagerEntity> managerEntity = this.managerDao.findById(userBoundary.getEmail());

		if (managerEntity.isPresent()) {
			Optional<BugEntity> bug = this.bugDao.findById(newBug.getBugName());

			if (bug.isPresent()) {
				throw new UserNotFoundException("Bug already exists!");
			}

			BugEntity bugEntity = new BugEntity();
			bugEntity.setBugName(newBug.getBugName());
			bugEntity.setDescription(newBug.getDescription());

			this.bugDao.save(bugEntity);

			return this.bugConverter.convertFromEntity(bugEntity);

		} else {
			throw new UserNotFoundException("this user is not a maanger!");
		}

	}

	@Transactional
	public List<BugBoundary> getAllBugs(ManagerBoundary newUser) {

		UserBoundary userBoundary = this.userService.login(newUser.getEmail());

		Optional<ManagerEntity> managerEntity = this.managerDao.findById(userBoundary.getEmail());

		if (managerEntity.isPresent()) {

			Iterator<BugEntity> bugs = this.bugDao.findAll().iterator();

			List<BugBoundary> finalBugs = new ArrayList<BugBoundary>();

			while (bugs.hasNext()) {

				BugEntity bug = bugs.next();

				BugBoundary finalBug = new BugBoundary();
				finalBug.setBugName(bug.getBugName());
				finalBug.setDescription(bug.getDescription());

				finalBugs.add(finalBug);
			}

			return finalBugs;

		} else {
			throw new UserNotFoundException("this user is not a maanger!");
		}

	}

}
