package acs.dal;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.BusinessEntity;


public interface  BusinessDao extends  CrudRepository<BusinessEntity,Long> {
	  List<BusinessEntity> findByBusinessEmail(String businessMail);
}
