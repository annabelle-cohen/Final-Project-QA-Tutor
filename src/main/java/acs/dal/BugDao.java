package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.BugEntity;

public interface BugDao extends CrudRepository<BugEntity, String> {

}
