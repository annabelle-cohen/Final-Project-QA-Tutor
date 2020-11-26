package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.AdminEntity;


public interface  AdminDao extends CrudRepository<AdminEntity, String>{

}
