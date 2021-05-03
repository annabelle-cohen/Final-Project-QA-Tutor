package acs.logic;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import acs.boundaries.ClassBoundary;
import acs.boundaries.StudentClassBoundary;
import acs.dal.ClassDao;
import acs.dal.ManagerDao;
import acs.dal.StudentDao;
import acs.data.convertor.ClassConverter;
import acs.data.convertor.ManagerConverter;
import acs.data.convertor.StudentConverter;
import acs.data.entity.ClassEntity;
import acs.data.entity.ManagerEntity;
import acs.data.entity.StudentEntity;

@Service
public class ClassService {

	@Autowired
	private StudentDao studentDao;

	@Autowired
	private ManagerDao managerDao;

	@Autowired
	private ClassDao classDao;

	@Autowired
	private ManagerConverter managerConverter;

	@Autowired
	private ClassConverter classConverter;

	@Transactional
	public ClassBoundary create(ClassBoundary cs) {

		Optional<ManagerEntity> managerEntity = this.managerDao.findById(cs.getManager());
		if (managerEntity.isPresent()) {

			Optional<ClassEntity> classEntity = this.classDao.findById(cs.getClassName());

			if (classEntity.isPresent()) {
				throw new UserNotFoundException("Class already exists");
			}

			ClassEntity c = new ClassEntity();
			c.setClassName(cs.getClassName());
			c.setCreatedByManager(cs.getManager());

			this.classDao.save(c);

			return this.classConverter.convertFromEntity(c);
		} else {
			throw new UserNotFoundException("User is not a manager :" + cs.getManager());
		}

	}

	@Transactional(readOnly = true)
	public ClassBoundary getOneClass(ClassBoundary cs) {
		Optional<ManagerEntity> managerEntity = this.managerDao.findById(cs.getManager());
		if (managerEntity.isPresent()) {

			Optional<ClassEntity> classEntity = this.classDao.findById(cs.getClassName());

			if (!classEntity.isPresent()) {
				throw new UserNotFoundException("Class doesn't exist");
			}

			return this.classConverter.convertFromEntity(classEntity.get());
		} else {
			throw new UserNotFoundException("User is not a manager :" + cs.getManager());
		}

	}

	@Transactional(readOnly = true)
	public List<ClassBoundary> getAllClasses(ClassBoundary cs) {

		Optional<ManagerEntity> managerEntity = this.managerDao.findById(cs.getManager());
		if (managerEntity.isPresent()) {

			Iterator<ClassEntity> classEntity = this.classDao.findAll().iterator();

			List<ClassBoundary> bounds = new ArrayList<ClassBoundary>();

			while (classEntity.hasNext()) {

				ClassBoundary bound = this.classConverter.convertFromEntity(classEntity.next());

				bounds.add(bound);

			}

			return bounds;

		} else {
			throw new UserNotFoundException("User is not a manager :" + cs.getManager());
		}

	}

	@Transactional
	public void addStudentToClass(StudentClassBoundary cs) {
		Optional<ManagerEntity> managerEntity = this.managerDao.findById(cs.getManagerEmail());
		if (managerEntity.isPresent()) {

			Optional<ClassEntity> classEntity = this.classDao.findById(cs.getClassName());

			if (!classEntity.isPresent()) {
				throw new UserNotFoundException("Class doesn't exist");
			}

			Optional<StudentEntity> studentEntity = this.studentDao.findById(cs.getStudentEmail());

			if (!studentEntity.isPresent()) {
				throw new UserNotFoundException("student doesn't exist");
			}

			ClassEntity ent_class = classEntity.get();
			StudentEntity ent_student = studentEntity.get();

			ent_student.setStudentClass(ent_class);
			ent_class.addStudent(ent_student);
			

			this.classDao.save(ent_class);
			this.studentDao.save(ent_student);
			
			
			System.out.println("yoo : " + ent_class.getStudents().size());

		} else {
			throw new UserNotFoundException("User is not a manager :" + cs.getManagerEmail());
		}

	}

	@Transactional
	public void removeStudentFromClass(StudentClassBoundary cs) {
		Optional<ManagerEntity> managerEntity = this.managerDao.findById(cs.getManagerEmail());
		if (managerEntity.isPresent()) {

			Optional<ClassEntity> classEntity = this.classDao.findById(cs.getClassName());

			if (!classEntity.isPresent()) {
				throw new UserNotFoundException("Class doesn't exist");
			}

			Optional<StudentEntity> studentEntity = this.studentDao.findById(cs.getStudentEmail());

			if (!studentEntity.isPresent()) {
				throw new UserNotFoundException("student doesn't exist");
			}

			ClassEntity ent_class = classEntity.get();
			StudentEntity ent_student = studentEntity.get();

			ent_class.removeStudent(ent_student);
			ent_student.setStudentClass(null);

			this.classDao.save(ent_class);
			this.studentDao.save(ent_student);

		} else {
			throw new UserNotFoundException("User is not a manager :" + cs.getManagerEmail());
		}

	}

}
