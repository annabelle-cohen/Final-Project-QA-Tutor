package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.AdminEntity;


public interface  AdminDao extends CrudRepository<AdminEntity, String>{

}
