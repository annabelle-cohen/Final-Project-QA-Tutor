
package acs.logic;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.StudentBoundary;
import acs.boundaries.UserBoundary;

import acs.dal.StudentDao;
import acs.dal.UserDao;

import acs.data.convertor.StudentConverter;

import acs.data.entity.StudentEntity;
import acs.data.entity.UserEntity;

@Service
public class StudentService {

	@Autowired
	private UserServiceWithDB userService;
	@Autowired
	private StudentConverter studentConverter;

	@Autowired
	private StudentDao studentDao;

	@Autowired
	private UserDao usersDao;

	@Transactional(readOnly = true)
	public StudentBoundary login(String email) {

		Optional<StudentEntity> userEntity = this.studentDao.findById(email);
		if (userEntity.isPresent()) {
			return this.studentConverter.convertFromEntity(userEntity.get());
		} else {
			throw new UserNotFoundException("User is not a manager :" + email);
		}
	}

	@Transactional
	public StudentBoundary createStudent(StudentBoundary newUser) {

		UserBoundary userBoundary = this.userService.login(newUser.getEmail());

		Optional<StudentEntity> managerEntity = this.studentDao.findById(userBoundary.getEmail());

		if (!managerEntity.isPresent()) {

			StudentEntity student = new StudentEntity();
			UserEntity userEntity = this.usersDao.findById(newUser.getEmail()).get();
			student.setEmail(userEntity.getEmail());
			student.setUser(userEntity);

			this.studentDao.save(student);

			return this.studentConverter.convertFromEntity(student);

		} else {
			throw new UserNotFoundException("this user is already a student!");
		}

	}

}
