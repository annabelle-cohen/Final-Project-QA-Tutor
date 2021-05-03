
package acs.data.convertor;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import acs.boundaries.ClassBoundary;
import acs.boundaries.StudentBoundary;
import acs.data.entity.ClassEntity;
import acs.data.entity.StudentEntity;

@Component
public class ClassConverter {

	@Autowired
	StudentConverter studentConverter;

	@PostConstruct
	public void setUp() {

	}

	public ClassBoundary convertFromEntity(ClassEntity entity) {
		ClassBoundary cs = new ClassBoundary();

		cs.setClassName(entity.getClassName());
		cs.setManager(entity.getCreatedByManager());

		List<StudentBoundary> students = new ArrayList<StudentBoundary>();

		List<StudentEntity> studentEntites = entity.getStudents();

		for (StudentEntity student : studentEntites) {
			students.add(this.studentConverter.convertFromEntity(student));
		}

		cs.setStudents(students);
		return cs;
	}

//	public ManagerEntity convertToEntity(ManagerBoundary boundary) {
//		ManagerEntity managerEntity = new ManagerEntity();
//		UserEntity userEntity = this.userConverter.convertToEntity(boundary.getManager());
//
//		managerEntity.setEmail(boundary.getEmail());
//		managerEntity.setUser(userEntity);
//
//		return managerEntity;
//	}
}
