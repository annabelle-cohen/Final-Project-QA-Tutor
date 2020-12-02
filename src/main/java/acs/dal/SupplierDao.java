package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.SupplierEntity;



public interface SupplierDao extends CrudRepository<SupplierEntity, Long>{



	
}