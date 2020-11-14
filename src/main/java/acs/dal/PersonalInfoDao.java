package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.PersonalInfoEntity;

public interface  PersonalInfoDao extends  CrudRepository<PersonalInfoEntity,String> {

}
