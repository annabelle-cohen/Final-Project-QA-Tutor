package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.StudentEntity;

public interface StudentDao extends CrudRepository<StudentEntity, String> {

}
