package acs.dal;

import org.springframework.data.repository.CrudRepository;

import acs.data.entity.ProductEntity;


public interface ProductDao extends CrudRepository<ProductEntity, Long>{



	
}