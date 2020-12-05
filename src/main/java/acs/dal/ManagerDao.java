package acs.dal;
import org.springframework.data.repository.CrudRepository;

import acs.data.entity.ManagerEntity;

public interface  ManagerDao extends CrudRepository<ManagerEntity, String>{

}
