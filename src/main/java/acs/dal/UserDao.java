package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.UserEntity;


public interface UserDao extends CrudRepository<UserEntity, String>{



	
}
