package acs.dal;

//import org.springframework.data.repository.PagingAndSortingRepository;

import acs.data.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface UserDao extends MongoRepository<UserEntity, String>/*CrudRepository<UserEntity, String>*/{

	
}
