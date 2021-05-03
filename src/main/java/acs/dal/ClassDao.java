package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.ClassEntity;

public interface ClassDao extends CrudRepository<ClassEntity, String> {

}