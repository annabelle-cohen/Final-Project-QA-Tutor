
package acs.data.convertor;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import acs.boundaries.BugBoundary;
import acs.boundaries.StudentBoundary;
import acs.boundaries.UserBoundary;
import acs.boundaries.UserType;
import acs.data.entity.BugEntity;
import acs.data.entity.StudentEntity;
import acs.data.entity.UserEntity;

@Component
public class StudentConverter {

	@Autowired
	UserConverter userConverter;

	@Autowired
	BugConverter bugConverter;

	@PostConstruct
	public void setUp() {

	}

	public StudentBoundary convertFromEntity(StudentEntity studentEntity) {
		StudentBoundary studentBound = new StudentBoundary();

		UserBoundary student = this.userConverter.convertFromEntity(studentEntity.getUser(), UserType.STUDENT);
		studentBound.setStudent(student);
		studentBound.setEmail(studentEntity.getEmail());
		studentBound.setManagerEmail(studentEntity.getManagerEmail());

		List<BugEntity> bugEntt = studentEntity.getBugs();
		List<BugBoundary> bugs = new ArrayList<BugBoundary>();

		for (BugEntity bug : bugEntt) {

			bugs.add(this.bugConverter.convertFromEntity(bug));
		}

		studentBound.setBugs(bugs);
		return studentBound;
	}

	public StudentEntity convertToEntity(StudentBoundary boundary) {
		StudentEntity studentEntity = new StudentEntity();
		UserEntity userEntity = this.userConverter.convertToEntity(boundary.getStudent());

		studentEntity.setEmail(boundary.getEmail());
		studentEntity.setUser(userEntity);

		return studentEntity;
	}
}
