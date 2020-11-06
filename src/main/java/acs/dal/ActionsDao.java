package acs.dal;

//import org.springframework.data.repository.PagingAndSortingRepository;

import acs.data.ActionEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActionsDao extends MongoRepository<ActionEntity, Long> /*CrudRepository<ActionEntity , Long>*/ {


}
