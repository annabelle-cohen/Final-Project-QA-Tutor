package acs.data.convertor;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import acs.boundaries.BugBoundary;

import acs.data.entity.BugEntity;


@Component
public class BugConverter {

	@Autowired
	UserConverter userConverter;

	@PostConstruct
	public void setUp() {

	}

	public BugBoundary convertFromEntity(BugEntity bugEntity) {
		BugBoundary bugBound = new BugBoundary();
		bugBound.setBugName(bugEntity.getBugName());
		bugBound.setDescription(bugEntity.getDescription());
		return bugBound;
	}

//	public StudentEntity convertToEntity(StudentBoundary boundary) {
//		StudentEntity studentEntity = new StudentEntity();
//		UserEntity userEntity = this.userConverter.convertToEntity(boundary.getStudent());
//
//		studentEntity.setEmail(boundary.getEmail());
//		studentEntity.setUser(userEntity);
//
//		return studentEntity;
//	}
}
