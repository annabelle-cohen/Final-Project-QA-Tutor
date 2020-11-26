package acs.dal;

//import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.CrudRepository;

import acs.data.entity.UserEntity;

import org.springframework.data.domain.PageRequest;
public interface UserDao extends CrudRepository<UserEntity, String>/*CrudRepository<UserEntity, String>*/{



	
}
