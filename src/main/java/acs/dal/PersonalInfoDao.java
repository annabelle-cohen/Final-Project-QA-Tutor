package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.PersonalInfoEntity;

public interface  PersonalInfoDao extends  CrudRepository<PersonalInfoEntity,String> {

}
