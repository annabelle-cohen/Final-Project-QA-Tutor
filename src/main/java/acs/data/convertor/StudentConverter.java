
package acs.data.convertor;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import acs.boundaries.StudentBoundary;
import acs.boundaries.UserBoundary;
import acs.data.entity.StudentEntity;
import acs.data.entity.UserEntity;

@Component
public class StudentConverter {

	@Autowired
	UserConverter userConverter;

	@PostConstruct
	public void setUp() {

	}

	public StudentBoundary convertFromEntity(StudentEntity studentEntity) {
		StudentBoundary studentBound = new StudentBoundary();

		UserBoundary student = this.userConverter.convertFromEntity(studentEntity.getUser());
		studentBound.setStudent(student);
		studentBound.setEmail(studentEntity.getEmail());

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
